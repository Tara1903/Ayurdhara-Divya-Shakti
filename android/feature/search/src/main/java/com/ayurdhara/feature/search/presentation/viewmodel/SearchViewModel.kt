package com.ayurdhara.feature.search.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ayurdhara.core.common.domain.model.Product
import com.ayurdhara.core.common.domain.repository.SupabaseAyurdharaRepositoryImpl
import com.ayurdhara.core.common.result.AppResult
import com.ayurdhara.core.common.result.UiState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

@OptIn(FlowPreview::class)
@HiltViewModel
class SearchViewModel @Inject constructor(
    private val repository: SupabaseAyurdharaRepositoryImpl
) : ViewModel() {

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery

    private val _searchResults = MutableStateFlow<UiState<List<Product>>>(UiState.Idle)
    val searchResults: StateFlow<UiState<List<Product>>> = _searchResults

    init {
        viewModelScope.launch {
            _searchQuery
                .debounce(300L)
                .distinctUntilChanged()
                .filter { it.isNotBlank() }
                .collect { query ->
                    performSearch(query)
                }
        }
        
        // Clear results if query is empty
        viewModelScope.launch {
            _searchQuery.collect { query ->
                if (query.isBlank()) {
                    _searchResults.value = UiState.Idle
                }
            }
        }
    }

    fun updateSearchQuery(query: String) {
        _searchQuery.value = query
    }

    private suspend fun performSearch(query: String) {
        _searchResults.value = UiState.Loading
        when (val result = repository.searchProducts(query)) {
            is AppResult.Success -> _searchResults.value = UiState.Success(result.data)
            is AppResult.Error -> _searchResults.value = UiState.Error(result.message ?: "Search failed")
            is AppResult.Loading -> _searchResults.value = UiState.Loading
        }
    }
}