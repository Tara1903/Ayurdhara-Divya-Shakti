package com.ayurdhara.feature.profile.di

import com.ayurdhara.feature.profile.data.SupabaseProfileRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import io.github.jan.supabase.SupabaseClient
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object ProfileModule {

    @Provides
    @Singleton
    fun provideProfileRepository(supabase: SupabaseClient): SupabaseProfileRepository {
        return SupabaseProfileRepository(supabase)
    }
}
