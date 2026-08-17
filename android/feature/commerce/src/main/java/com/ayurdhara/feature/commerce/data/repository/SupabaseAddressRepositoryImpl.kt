package com.ayurdhara.feature.commerce.data.repository

import com.ayurdhara.feature.commerce.domain.model.Address
import com.ayurdhara.feature.commerce.domain.repository.AddressRepository
import com.ayurdhara.core.network.model.AddressDto
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.postgrest
import io.github.jan.supabase.postgrest.query.Columns
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import javax.inject.Inject

class SupabaseAddressRepositoryImpl @Inject constructor(
    private val supabase: SupabaseClient
) : AddressRepository {

    override fun getAddresses(): Flow<List<Address>> = flow {
        val userId = supabase.auth.currentUserOrNull()?.id ?: run {
            emit(emptyList())
            return@flow
        }
        val dtos = supabase.postgrest["addresses"]
            .select {
                filter { eq("user_id", userId) }
            }
            .decodeList<AddressDto>()
        emit(dtos.map { it.toDomain() })
    }.flowOn(Dispatchers.IO)

    override suspend fun addAddress(address: Address): Result<Unit> = runCatching {
        val userId = supabase.auth.currentUserOrNull()?.id
            ?: error("Not logged in")
        supabase.postgrest["addresses"].insert(
            buildJsonObject {
                put("user_id", userId)
                put("type", address.type)
                put("name", address.name)
                put("phone", address.phone)
                put("pincode", address.pincode)
                put("state", address.state)
                put("city", address.city)
                put("line1", address.line1)
                address.landmark?.let { put("landmark", it) }
                put("is_default", address.isDefault)
            }
        )
    }

    override suspend fun updateAddress(address: Address): Result<Unit> = runCatching {
        supabase.postgrest["addresses"].update(
            buildJsonObject {
                put("type", address.type)
                put("name", address.name)
                put("phone", address.phone)
                put("pincode", address.pincode)
                put("state", address.state)
                put("city", address.city)
                put("line1", address.line1)
                address.landmark?.let { put("landmark", it) }
                put("is_default", address.isDefault)
            }
        ) {
            filter { eq("id", address.id) }
        }
    }

    override suspend fun deleteAddress(addressId: String): Result<Unit> = runCatching {
        supabase.postgrest["addresses"].delete {
            filter { eq("id", addressId) }
        }
    }

    override suspend fun setDefaultAddress(addressId: String): Result<Unit> = runCatching {
        val userId = supabase.auth.currentUserOrNull()?.id ?: error("Not logged in")
        // Clear existing default
        supabase.postgrest["addresses"].update(buildJsonObject { put("is_default", false) }) {
            filter { eq("user_id", userId) }
        }
        // Set new default
        supabase.postgrest["addresses"].update(buildJsonObject { put("is_default", true) }) {
            filter { eq("id", addressId) }
        }
    }

    private fun AddressDto.toDomain() = Address(
        id = id,
        type = type,
        name = name,
        phone = phone,
        pincode = pincode,
        state = state,
        city = city,
        line1 = line1,
        landmark = landmark,
        isDefault = isDefault
    )
}
