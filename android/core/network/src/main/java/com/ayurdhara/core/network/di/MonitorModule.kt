package com.ayurdhara.core.network.di

import com.ayurdhara.core.network.monitor.ConnectivityManagerNetworkMonitor
import com.ayurdhara.core.network.monitor.NetworkMonitor
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
abstract class MonitorModule {
    @Binds
    abstract fun bindNetworkMonitor(
        monitor: ConnectivityManagerNetworkMonitor
    ): NetworkMonitor
}