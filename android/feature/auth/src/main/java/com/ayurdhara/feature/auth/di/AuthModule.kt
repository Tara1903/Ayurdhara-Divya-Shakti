package com.ayurdhara.feature.auth.di

import com.ayurdhara.feature.auth.data.repository.SupabaseAuthRepositoryImpl
import com.ayurdhara.feature.auth.domain.repository.AuthRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
abstract class AuthModule {
    @Binds
    abstract fun bindAuthRepository(supabaseAuthRepositoryImpl: SupabaseAuthRepositoryImpl): AuthRepository
}