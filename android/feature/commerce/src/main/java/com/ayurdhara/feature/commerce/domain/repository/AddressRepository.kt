package com.ayurdhara.feature.commerce.domain.repository

import com.ayurdhara.feature.commerce.domain.model.Address
import kotlinx.coroutines.flow.Flow

interface AddressRepository {
    fun getAddresses(): Flow<List<Address>>
    suspend fun addAddress(address: Address): Result<Unit>
    suspend fun updateAddress(address: Address): Result<Unit>
    suspend fun deleteAddress(addressId: String): Result<Unit>
    suspend fun setDefaultAddress(addressId: String): Result<Unit>
}