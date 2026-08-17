package com.ayurdhara.feature.commerce.di

import com.ayurdhara.feature.commerce.data.repository.SupabaseAddressRepositoryImpl
import com.ayurdhara.feature.commerce.data.repository.SupabaseOrderRepositoryImpl
import com.ayurdhara.feature.commerce.domain.repository.AddressRepository
import com.ayurdhara.feature.commerce.domain.repository.OrderRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class CommerceModule {

    @Binds
    @Singleton
    abstract fun bindAddressRepository(
        impl: SupabaseAddressRepositoryImpl
    ): AddressRepository

    @Binds
    @Singleton
    abstract fun bindOrderRepository(
        impl: SupabaseOrderRepositoryImpl
    ): OrderRepository
}
