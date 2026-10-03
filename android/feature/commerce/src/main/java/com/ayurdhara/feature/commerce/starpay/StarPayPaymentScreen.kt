package com.ayurdhara.feature.commerce.starpay

import android.content.ActivityNotFoundException
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.graphics.BitmapFactory
import android.net.Uri
import android.util.Base64
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.scale
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.PathMeasure
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.OffsetMapping
import androidx.compose.ui.text.input.TransformedText
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.compose.LocalLifecycleOwner
import kotlinx.coroutines.delay
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StarPayPaymentScreen(
    orderId: String? = null,
    paymentToken: String? = null,
    baseAmount: Double = 0.0,
    orderRef: String? = null,
    description: String? = null,
    customerName: String? = null,
    customerEmail: String? = null,
    customerPhone: String? = null,
    metadata: Map<String, String>? = null,
    viewModel: StarPayViewModel = hiltViewModel(),
    onClose: () -> Unit = {},
    onPaymentSuccess: (StarPayOrderDetails) -> Unit = {},
    onContinueShopping: () -> Unit = onClose
) {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current
    val uiState by viewModel.uiState.collectAsState()
    var showCancelDialog by remember { mutableStateOf(false) }

    // Initialize or load order
    LaunchedEffect(orderId, paymentToken) {
        if (!orderId.isNullOrBlank() && !paymentToken.isNullOrBlank()) {
            viewModel.loadExistingPayment(orderId, paymentToken)
        } else if (baseAmount > 0.0) {
            viewModel.initializePayment(
                amount = baseAmount,
                orderRef = orderRef,
                description = description,
                customerName = customerName,
                customerEmail = customerEmail,
                customerPhone = customerPhone,
                metadata = metadata
            )
        }
    }

    // Lifecycle observer for ON_RESUME status refresh
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_RESUME) {
                viewModel.refreshOnResume()
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }

    // Auto-trigger onPaymentSuccess after 2.5s when PAID
    LaunchedEffect(uiState) {
        if (uiState is StarPayUiState.Paid) {
            val order = (uiState as StarPayUiState.Paid).order
            delay(2500)
            onPaymentSuccess(order)
        }
    }

    // Intercept hardware back button
    BackHandler {
        if (uiState is StarPayUiState.Paid) {
            val order = (uiState as StarPayUiState.Paid).order
            onPaymentSuccess(order)
        } else {
            showCancelDialog = true
        }
    }

    // Cancel Confirmation Dialog
    if (showCancelDialog) {
        AlertDialog(
            onDismissRequest = { showCancelDialog = false },
            containerColor = StarPayColors.Surface1,
            title = {
                Text(
                    "Cancel Payment?",
                    color = StarPayColors.TextPrimary,
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                Text(
                    "If you already sent money from your UPI app, please wait for verification or submit your 12-digit UTR instead of cancelling.",
                    color = StarPayColors.TextSecondary,
                    fontSize = 14.sp
                )
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        showCancelDialog = false
                        viewModel.setManualSheetVisible(true)
                    }
                ) {
                    Text("Submit UTR", color = StarPayColors.BrandVioletLight, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(
                    onClick = {
                        showCancelDialog = false
                        onClose()
                    }
                ) {
                    Text("Exit", color = StarPayColors.Red)
                }
            }
        )
    }

    Scaffold(
        containerColor = StarPayColors.Surface0,
        topBar = {
            StarPayTopBar(onClose = { showCancelDialog = true })
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .background(StarPayColors.Surface0)
        ) {
            when (val state = uiState) {
                is StarPayUiState.Loading -> {
                    LoadingView(message = state.message)
                }
                is StarPayUiState.AwaitingPayment -> {
                    AwaitingPaymentView(
                        state = state,
                        onUpiAppClick = { packageName, upiUrl ->
                            launchUpiApp(context, packageName, upiUrl, onAppNotFound = {
                                viewModel.showSnackbar("App not installed, opening UPI chooser...")
                            })
                        },
                        onOpenAnyUpi = { upiUrl ->
                            launchGenericUpi(context, upiUrl)
                        },
                        onCopy = { text, label ->
                            copyToClipboard(context, text, label)
                        },
                        onOpenManualUtr = {
                            viewModel.setManualSheetVisible(true)
                        }
                    )

                    // Manual UTR Bottom Sheet
                    if (state.showManualSheet) {
                        ManualUtrBottomSheet(
                            utrInput = state.utrInput,
                            utrNotes = state.utrNotes,
                            utrError = state.utrError,
                            isSubmitting = state.isSubmittingUtr,
                            onUtrChange = viewModel::onUtrChanged,
                            onNotesChange = viewModel::onUtrNotesChanged,
                            onSubmit = viewModel::submitManualUtr,
                            onDismiss = { viewModel.setManualSheetVisible(false) }
                        )
                    }
                }
                is StarPayUiState.Verifying -> {
                    VerifyingView(order = state.order, currentStep = state.currentStep)
                }
                is StarPayUiState.PendingVerification -> {
                    PendingVerificationView(
                        order = state.order,
                        onOpenManualUtr = { viewModel.setManualSheetVisible(true) }
                    )
                }
                is StarPayUiState.Paid -> {
                    PaidSuccessView(
                        order = state.order,
                        onContinue = { onPaymentSuccess(state.order) },
                        onContinueShopping = onContinueShopping,
                        onCopy = { text, label -> copyToClipboard(context, text, label) }
                    )
                }
                is StarPayUiState.Failed -> {
                    FailedView(
                        order = state.order,
                        errorMessage = state.errorMessage,
                        onRetry = {
                            if (baseAmount > 0.0) {
                                viewModel.initializePayment(
                                    amount = baseAmount,
                                    orderRef = orderRef,
                                    description = description,
                                    customerName = customerName,
                                    customerEmail = customerEmail,
                                    customerPhone = customerPhone,
                                    metadata = metadata
                                )
                            } else {
                                onClose()
                            }
                        },
                        onSubmitUtr = { viewModel.setManualSheetVisible(true) }
                    )
                }
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// Top bar: [close] [⚡ Ayurdhara Divya Shakti] [● 🔒 STARPAY]
// -------------------------------------------------------------------------------------------------
@Composable
private fun StarPayTopBar(onClose: () -> Unit) {
    val transition = rememberInfiniteTransition(label = "topPulse")
    val dotAlpha by transition.animateFloat(
        initialValue = 0.3f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(900), RepeatMode.Reverse),
        label = "dot"
    )

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(StarPayColors.Surface0)
            .statusBarsPadding()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(36.dp)
                .clip(CircleShape)
                .background(StarPayColors.Surface2)
                .clickable(onClick = onClose),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Close,
                contentDescription = "Close",
                tint = StarPayColors.TextSecondary,
                modifier = Modifier.size(18.dp)
            )
        }

        Box(
            modifier = Modifier
                .weight(1f)
                .padding(horizontal = 8.dp),
            contentAlignment = Alignment.Center
        ) {
            Row(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(StarPayColors.Surface2)
                    .padding(horizontal = 12.dp, vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Bolt,
                    contentDescription = null,
                    tint = StarPayColors.Amber,
                    modifier = Modifier.size(14.dp)
                )
                Spacer(Modifier.width(6.dp))
                Text(
                    "Ayurdhara Divya Shakti",
                    color = StarPayColors.TextPrimary,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }
        }

        Row(
            modifier = Modifier
                .clip(CircleShape)
                .background(StarPayColors.CyanSoft)
                .padding(horizontal = 10.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(6.dp)
                    .alpha(dotAlpha)
                    .clip(CircleShape)
                    .background(StarPayColors.Cyan)
            )
            Spacer(Modifier.width(5.dp))
            Icon(
                imageVector = Icons.Default.Lock,
                contentDescription = null,
                tint = StarPayColors.Cyan,
                modifier = Modifier.size(13.dp)
            )
            Spacer(Modifier.width(3.dp))
            Text(
                "STARPAY",
                color = StarPayColors.Cyan,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.sp
            )
        }
    }
}

// -------------------------------------------------------------------------------------------------
// Loading View
// -------------------------------------------------------------------------------------------------
@Composable
private fun LoadingView(message: String) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        CircularProgressIndicator(
            color = StarPayColors.BrandViolet,
            strokeWidth = 3.dp,
            modifier = Modifier.size(48.dp)
        )
        Spacer(Modifier.height(16.dp))
        Text(
            text = message,
            color = StarPayColors.TextSecondary,
            fontSize = 14.sp
        )
    }
}

// -------------------------------------------------------------------------------------------------
// State A: Awaiting Payment View
// -------------------------------------------------------------------------------------------------
@Composable
private fun AwaitingPaymentView(
    state: StarPayUiState.AwaitingPayment,
    onUpiAppClick: (String, String) -> Unit,
    onOpenAnyUpi: (String) -> Unit,
    onCopy: (String, String) -> Unit,
    onOpenManualUtr: () -> Unit
) {
    val scrollState = rememberScrollState()
    val upiUrl = state.qrData?.upiUrl ?: ""

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(horizontal = 16.dp, vertical = 8.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Hero Amount Card
        HeroAmountSection(
            order = state.order,
            onCopyAmount = { onCopy(formatAmount(state.order.reservedAmount), "Amount") }
        )

        Spacer(Modifier.height(12.dp))

        // Warning Banner for exact paise
        PaiseWarningBanner(reservedAmount = state.order.reservedAmount)

        Spacer(Modifier.height(20.dp))

        // UPI Quick Launch Grid
        UpiQuickLaunchSection(
            upiUrl = upiUrl,
            onUpiAppClick = onUpiAppClick,
            onOpenAnyUpi = onOpenAnyUpi
        )

        Spacer(Modifier.height(20.dp))

        // Divider
        Box(
            modifier = Modifier.fillMaxWidth(),
            contentAlignment = Alignment.Center
        ) {
            HorizontalDivider(
                modifier = Modifier.fillMaxWidth(),
                color = StarPayColors.Surface3
            )
            Text(
                "OR SCAN QR CODE",
                color = StarPayColors.TextSecondary,
                fontSize = 10.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.5.sp,
                modifier = Modifier
                    .background(StarPayColors.Surface0)
                    .padding(horizontal = 12.dp)
            )
        }

        Spacer(Modifier.height(20.dp))

        // Native QR Code Card (includes live countdown)
        QrCodeCard(
            qrData = state.qrData,
            remainingSeconds = state.timeRemainingSeconds,
            onCopyUpiId = { upiId -> onCopy(upiId, "UPI ID") }
        )

        Spacer(Modifier.height(16.dp))

        // Manual UTR Fallback Link Button
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Row(
                modifier = Modifier
                    .clip(RoundedCornerShape(10.dp))
                    .clickable(onClick = onOpenManualUtr)
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    "Already paid? Enter 12-digit UTR manually",
                    color = StarPayColors.BrandVioletLight,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.SemiBold,
                    textAlign = TextAlign.Center
                )
                Icon(
                    imageVector = Icons.Default.ChevronRight,
                    contentDescription = null,
                    tint = StarPayColors.BrandVioletLight,
                    modifier = Modifier.size(16.dp)
                )
            }
            Text(
                "Instant automated reconciliation via NPCI gateway",
                color = StarPayColors.TextSecondary,
                fontSize = 10.sp,
                letterSpacing = 0.3.sp,
                textAlign = TextAlign.Center
            )
        }

        Spacer(Modifier.height(24.dp))
    }
}

// -------------------------------------------------------------------------------------------------
// Hero Amount Component
// -------------------------------------------------------------------------------------------------
@Composable
private fun HeroAmountSection(
    order: StarPayOrderDetails,
    onCopyAmount: () -> Unit
) {
    val (rupees, paise) = splitAmount(order.reservedAmount)
    val decimalPart = String.format(Locale.US, ".%02d", paise)

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(StarPayColors.Surface1)
            .background(
                Brush.verticalGradient(
                    listOf(
                        StarPayColors.BrandViolet.copy(alpha = 0.07f),
                        Color.Transparent,
                        StarPayColors.Cyan.copy(alpha = 0.06f)
                    )
                )
            )
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                "AMOUNT TO PAY",
                color = StarPayColors.TextSecondary,
                fontSize = 11.sp,
                fontWeight = FontWeight.SemiBold,
                letterSpacing = 1.2.sp
            )

            Spacer(Modifier.height(8.dp))

            Row(
                verticalAlignment = Alignment.Bottom,
                horizontalArrangement = Arrangement.Center
            ) {
                Text(
                    "₹" + String.format(Locale.US, "%,d", rupees),
                    color = StarPayColors.TextPrimary,
                    fontSize = 44.sp,
                    fontWeight = FontWeight.ExtraBold
                )
                Text(
                    decimalPart,
                    color = StarPayColors.BrandVioletLight,
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = StarPayFonts.Monospace,
                    modifier = Modifier.padding(bottom = 5.dp)
                )
                Spacer(Modifier.width(10.dp))
                Row(
                    modifier = Modifier
                        .padding(bottom = 8.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(StarPayColors.Surface3)
                        .clickable(onClick = onCopyAmount)
                        .padding(horizontal = 8.dp, vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.ContentCopy,
                        contentDescription = "Copy Amount",
                        tint = StarPayColors.TextSecondary,
                        modifier = Modifier.size(12.dp)
                    )
                    Spacer(Modifier.width(4.dp))
                    Text(
                        "COPY",
                        color = StarPayColors.TextSecondary,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.8.sp
                    )
                }
            }

            if (!order.description.isNullOrBlank()) {
                Text(
                    order.description,
                    color = StarPayColors.TextSecondary,
                    fontSize = 13.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }

            Spacer(Modifier.height(8.dp))

            Row(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(StarPayColors.Surface3)
                    .padding(horizontal = 12.dp, vertical = 5.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Tag,
                    contentDescription = null,
                    tint = StarPayColors.Cyan,
                    modifier = Modifier.size(13.dp)
                )
                Spacer(Modifier.width(6.dp))
                Text(
                    "Ref: ${order.orderRef}",
                    color = StarPayColors.TextSecondary,
                    fontFamily = StarPayFonts.Monospace,
                    fontSize = 11.sp,
                    letterSpacing = 0.6.sp
                )
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// Warning Banner for exact paise
// -------------------------------------------------------------------------------------------------
@Composable
private fun PaiseWarningBanner(reservedAmount: Double) {
    val (_, paise) = splitAmount(reservedAmount)
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(StarPayColors.Surface2)
            .padding(12.dp),
        verticalAlignment = Alignment.Top
    ) {
        Box(
            modifier = Modifier
                .size(28.dp)
                .clip(RoundedCornerShape(8.dp))
                .background(StarPayColors.Amber.copy(alpha = 0.22f)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.PriorityHigh,
                contentDescription = null,
                tint = StarPayColors.Amber,
                modifier = Modifier.size(16.dp)
            )
        }
        Spacer(Modifier.width(12.dp))
        Text(
            text = buildAnnotatedString {
                append("Pay exact amount ")
                withStyle(SpanStyle(color = StarPayColors.Cyan, fontWeight = FontWeight.SemiBold)) {
                    append("₹${formatAmount(reservedAmount)}")
                }
                append(" (including $paise paise) for ")
                withStyle(SpanStyle(color = StarPayColors.Amber, fontWeight = FontWeight.Medium)) {
                    append("instant automatic verification")
                }
                append(".")
            },
            color = StarPayColors.TextPrimary,
            fontSize = 12.5.sp,
            lineHeight = 19.sp,
            fontWeight = FontWeight.Medium
        )
    }
}

// -------------------------------------------------------------------------------------------------
// UPI Quick Launch Grid
// -------------------------------------------------------------------------------------------------
@Composable
private fun UpiQuickLaunchSection(
    upiUrl: String,
    onUpiAppClick: (String, String) -> Unit,
    onOpenAnyUpi: (String) -> Unit
) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 4.dp, vertical = 0.dp)
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                "PAY INSTANTLY WITH UPI APP",
                color = StarPayColors.TextSecondary,
                fontSize = 10.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.sp,
                modifier = Modifier.weight(1f)
            )
            Text(
                "ZERO SURCHARGE",
                color = StarPayColors.Cyan,
                fontSize = 10.sp,
                fontWeight = FontWeight.SemiBold,
                letterSpacing = 0.5.sp
            )
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            UpiAppTile(
                name = "GPay",
                packageName = "com.google.android.apps.nbu.paisa.user",
                tileColor = StarPayColors.Surface3,
                upiUrl = upiUrl,
                modifier = Modifier.weight(1f),
                onClick = onUpiAppClick
            ) {
                Text(
                    "G",
                    color = Color(0xFF4285F4),
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 20.sp
                )
            }
            UpiAppTile(
                name = "PhonePe",
                packageName = "com.phonepe.app",
                tileColor = Color(0xFF5F259F).copy(alpha = 0.22f),
                upiUrl = upiUrl,
                modifier = Modifier.weight(1f),
                onClick = onUpiAppClick
            ) {
                Icon(
                    imageVector = Icons.Default.AccountBalanceWallet,
                    contentDescription = null,
                    tint = Color(0xFFA078FF),
                    modifier = Modifier.size(22.dp)
                )
            }
            UpiAppTile(
                name = "Paytm",
                packageName = "net.one97.paytm",
                tileColor = StarPayColors.CyanSoft,
                upiUrl = upiUrl,
                modifier = Modifier.weight(1f),
                onClick = onUpiAppClick
            ) {
                Icon(
                    imageVector = Icons.Default.Payments,
                    contentDescription = null,
                    tint = StarPayColors.Cyan,
                    modifier = Modifier.size(22.dp)
                )
            }
            UpiAppTile(
                name = "BHIM",
                packageName = "in.org.npci.upiapp",
                tileColor = StarPayColors.Amber.copy(alpha = 0.18f),
                upiUrl = upiUrl,
                modifier = Modifier.weight(1f),
                onClick = onUpiAppClick
            ) {
                Icon(
                    imageVector = Icons.Default.QrCodeScanner,
                    contentDescription = null,
                    tint = StarPayColors.Amber,
                    modifier = Modifier.size(22.dp)
                )
            }
        }

        Spacer(Modifier.height(16.dp))

        // Open Any UPI Button
        Button(
            onClick = { onOpenAnyUpi(upiUrl) },
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp),
            shape = RoundedCornerShape(14.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
            contentPadding = PaddingValues(0.dp)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(StarPayColors.CtaGradient)
                    .padding(horizontal = 16.dp),
                contentAlignment = Alignment.Center
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Text(
                        "Open Any Installed UPI App",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp
                    )
                    Spacer(Modifier.width(8.dp))
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }
        }
    }
}

@Composable
private fun UpiAppTile(
    name: String,
    packageName: String,
    tileColor: Color,
    upiUrl: String,
    modifier: Modifier = Modifier,
    onClick: (String, String) -> Unit,
    icon: @Composable () -> Unit
) {
    Column(
        modifier = modifier
            .clip(RoundedCornerShape(16.dp))
            .background(StarPayColors.Surface1)
            .clickable { onClick(packageName, upiUrl) }
            .padding(vertical = 12.dp, horizontal = 4.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(40.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(tileColor),
            contentAlignment = Alignment.Center
        ) {
            icon()
        }
        Spacer(Modifier.height(6.dp))
        Text(
            text = name,
            color = StarPayColors.TextPrimary,
            fontSize = 11.sp,
            fontWeight = FontWeight.SemiBold,
            maxLines = 1
        )
    }
}

// -------------------------------------------------------------------------------------------------
// QR Code Display Card
// -------------------------------------------------------------------------------------------------
@Composable
private fun QrCodeCard(
    qrData: StarPayQrData?,
    remainingSeconds: Long,
    onCopyUpiId: (String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(StarPayColors.Surface1)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        val qrBitmap = remember(qrData?.qrDataUrl) {
            qrData?.qrDataUrl?.let { decodeBase64ToBitmap(it) }
        }

        // High-contrast white surface for optical recognition, with StarPay locator marks
        Box(
            modifier = Modifier
                .size(224.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(Color.White)
        ) {
            val markModifier = Modifier.size(10.dp)
            Box(
                markModifier
                    .align(Alignment.TopStart)
                    .padding(0.dp)
                    .offset(5.dp, 5.dp)
                    .background(StarPayColors.SurfaceLowest, RoundedCornerShape(topStart = 6.dp))
            )
            Box(
                markModifier
                    .align(Alignment.TopEnd)
                    .offset((-5).dp, 5.dp)
                    .background(StarPayColors.SurfaceLowest, RoundedCornerShape(topEnd = 6.dp))
            )
            Box(
                markModifier
                    .align(Alignment.BottomStart)
                    .offset(5.dp, (-5).dp)
                    .background(StarPayColors.SurfaceLowest, RoundedCornerShape(bottomStart = 6.dp))
            )
            Box(
                markModifier
                    .align(Alignment.BottomEnd)
                    .offset((-5).dp, (-5).dp)
                    .background(StarPayColors.SurfaceLowest, RoundedCornerShape(bottomEnd = 6.dp))
            )

            Box(
                modifier = Modifier
                    .align(Alignment.Center)
                    .size(192.dp),
                contentAlignment = Alignment.Center
            ) {
                if (qrBitmap != null) {
                    Image(
                        bitmap = qrBitmap,
                        contentDescription = "UPI Payment QR Code",
                        modifier = Modifier.fillMaxSize()
                    )
                    // Ayurdhara emblem badge (kept small so the QR stays scannable)
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .clip(CircleShape)
                            .background(Color.White),
                        contentAlignment = Alignment.Center
                    ) {
                        Box(
                            modifier = Modifier
                                .size(26.dp)
                                .clip(CircleShape)
                                .background(StarPayColors.BrandViolet),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.Spa,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(15.dp)
                            )
                        }
                    }
                } else {
                    CircularProgressIndicator(
                        color = StarPayColors.BrandViolet,
                        strokeWidth = 2.dp,
                        modifier = Modifier.size(36.dp)
                    )
                }
            }
        }

        Spacer(Modifier.height(16.dp))

        Text(
            "Scan with any UPI camera or payment app",
            color = StarPayColors.TextPrimary,
            fontSize = 13.sp,
            fontWeight = FontWeight.Medium,
            textAlign = TextAlign.Center
        )
        Spacer(Modifier.height(4.dp))
        Text(
            "Works with GPay, PhonePe, Paytm, Cred & Mobile Banking",
            color = StarPayColors.TextSecondary,
            fontSize = 11.sp,
            textAlign = TextAlign.Center
        )

        Spacer(Modifier.height(16.dp))

        // One-tap UPI ID pill
        val upiId = qrData?.upiId ?: "ayurdhara@upi"
        var copied by remember { mutableStateOf(false) }
        LaunchedEffect(copied) {
            if (copied) {
                delay(2000)
                copied = false
            }
        }
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(StarPayColors.Surface2)
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.AlternateEmail,
                contentDescription = null,
                tint = StarPayColors.Cyan,
                modifier = Modifier.size(18.dp)
            )
            Spacer(Modifier.width(8.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    "VPA HANDLE",
                    color = StarPayColors.TextSecondary,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.SemiBold,
                    letterSpacing = 0.8.sp
                )
                Text(
                    upiId,
                    color = StarPayColors.TextPrimary,
                    fontFamily = StarPayFonts.Monospace,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }
            Spacer(Modifier.width(8.dp))
            Text(
                if (copied) "COPIED" else "COPY ID",
                color = StarPayColors.BrandVioletLight,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 0.5.sp,
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .background(StarPayColors.Surface3)
                    .clickable {
                        onCopyUpiId(upiId)
                        copied = true
                    }
                    .padding(horizontal = 12.dp, vertical = 7.dp)
            )
        }

        Spacer(Modifier.height(12.dp))

        // Live Countdown Timer
        CountdownTimerBar(remainingSeconds = remainingSeconds)
    }
}

// -------------------------------------------------------------------------------------------------
// Countdown Timer Bar
// -------------------------------------------------------------------------------------------------
@Composable
private fun CountdownTimerBar(remainingSeconds: Long) {
    val minutes = remainingSeconds / 60
    val seconds = remainingSeconds % 60
    val timeFormatted = String.format(Locale.US, "%02d:%02d", minutes, seconds)

    val (barColor, barBackground) = when {
        remainingSeconds > 120 -> Pair(StarPayColors.Cyan, StarPayColors.CyanSoft)
        remainingSeconds in 60..120 -> Pair(StarPayColors.Amber, StarPayColors.AmberSoft)
        else -> Pair(StarPayColors.Red, StarPayColors.RedSoft)
    }

    val transition = rememberInfiniteTransition(label = "hourglass")
    val angle by transition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(tween(4000, easing = LinearEasing)),
        label = "hourglassAngle"
    )

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(barBackground)
            .padding(horizontal = 14.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(
                imageVector = Icons.Default.HourglassTop,
                contentDescription = null,
                tint = barColor,
                modifier = Modifier
                    .size(16.dp)
                    .rotate(angle)
            )
            Spacer(Modifier.width(8.dp))
            Text(
                "QR session expires in",
                color = StarPayColors.TextPrimary,
                fontSize = 12.sp,
                fontWeight = FontWeight.Medium
            )
        }
        Text(
            timeFormatted,
            color = barColor,
            fontFamily = StarPayFonts.Monospace,
            fontWeight = FontWeight.Bold,
            fontSize = 14.sp,
            letterSpacing = 1.5.sp
        )
    }
}

// -------------------------------------------------------------------------------------------------
// State B: Verifying Radar View
// -------------------------------------------------------------------------------------------------
@Composable
private fun VerifyingView(order: StarPayOrderDetails, currentStep: Int) {
    val infiniteTransition = rememberInfiniteTransition(label = "radar")
    val ping by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(1800, easing = LinearOutSlowInEasing)),
        label = "ping"
    )
    val pulse by infiniteTransition.animateFloat(
        initialValue = 0.4f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(1200, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulse"
    )
    val sweep by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(tween(3000, easing = LinearEasing)),
        label = "sweep"
    )
    val receivedAt = remember { SimpleDateFormat("HH:mm:ss", Locale.US).format(Date()) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Order reference header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(StarPayColors.Surface1)
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.ReceiptLong,
                contentDescription = null,
                tint = StarPayColors.Cyan,
                modifier = Modifier.size(20.dp)
            )
            Spacer(Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    "ORDER REF #${order.orderRef}",
                    color = StarPayColors.TextSecondary,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.SemiBold,
                    letterSpacing = 0.8.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    order.description?.takeIf { it.isNotBlank() } ?: "Ayurdhara Order",
                    color = StarPayColors.TextPrimary,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.SemiBold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }
            Spacer(Modifier.width(8.dp))
            Text(
                "₹${formatAmount(order.reservedAmount)}",
                color = StarPayColors.Cyan,
                fontFamily = StarPayFonts.Monospace,
                fontWeight = FontWeight.Bold,
                fontSize = 14.sp
            )
        }

        Spacer(Modifier.height(28.dp))

        // Luminous radar
        Box(
            modifier = Modifier.size(176.dp),
            contentAlignment = Alignment.Center
        ) {
            // Expanding ping wave
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .scale(0.7f + 0.3f * ping)
                    .alpha(0.35f * (1f - ping))
                    .clip(CircleShape)
                    .background(StarPayColors.BrandViolet.copy(alpha = 0.5f))
            )
            // Breathing glow
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(8.dp)
                    .alpha(0.35f * pulse)
                    .clip(CircleShape)
                    .background(StarPayColors.Cyan.copy(alpha = 0.35f))
            )
            // Concentric tracks + sweep beam
            Canvas(modifier = Modifier.fillMaxSize()) {
                val c = center
                val r = size.minDimension / 2f
                drawCircle(
                    color = StarPayColors.BrandViolet.copy(alpha = 0.45f),
                    radius = r * 0.97f,
                    style = Stroke(width = 2.dp.toPx())
                )
                drawCircle(
                    color = StarPayColors.Cyan.copy(alpha = 0.45f),
                    radius = r * 0.78f,
                    style = Stroke(
                        width = 1.5.dp.toPx(),
                        pathEffect = PathEffect.dashPathEffect(floatArrayOf(10f, 10f))
                    )
                )
                rotate(degrees = sweep, pivot = c) {
                    drawCircle(
                        brush = Brush.sweepGradient(
                            colors = listOf(
                                Color.Transparent,
                                StarPayColors.BrandViolet.copy(alpha = 0.22f),
                                StarPayColors.Cyan.copy(alpha = 0.5f)
                            ),
                            center = c
                        ),
                        radius = r * 0.72f,
                        center = c
                    )
                }
            }
            // Telemetry core
            Column(
                modifier = Modifier
                    .size(64.dp)
                    .shadow(12.dp, CircleShape)
                    .clip(CircleShape)
                    .background(StarPayColors.Surface2),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = Icons.Default.SatelliteAlt,
                    contentDescription = null,
                    tint = StarPayColors.Cyan,
                    modifier = Modifier
                        .size(26.dp)
                        .alpha(0.5f + 0.5f * pulse)
                )
                Text(
                    "NPCI",
                    color = StarPayColors.BrandVioletLight,
                    fontSize = 9.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )
            }
        }

        Spacer(Modifier.height(24.dp))

        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(8.dp)
                    .alpha(pulse)
                    .clip(CircleShape)
                    .background(StarPayColors.Cyan)
            )
            Spacer(Modifier.width(8.dp))
            Text(
                "Payment Detected — Verifying with Bank Records...",
                color = StarPayColors.TextPrimary,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold,
                textAlign = TextAlign.Center,
                lineHeight = 22.sp,
                modifier = Modifier.weight(1f, fill = false)
            )
        }

        Spacer(Modifier.height(20.dp))

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(StarPayColors.Surface1)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            ChecklistItem(
                label = "SMS Received from Bank Gateway",
                trailing = receivedAt,
                isCompleted = true,
                isInProgress = false
            )
            ChecklistItem(
                label = "Matching Exact Settlement (₹${formatAmount(order.reservedAmount)})",
                trailing = "MATCH",
                isCompleted = true,
                isInProgress = false
            )
            ChecklistItem(
                label = "Verifying UTR Uniqueness with NPCI Node...",
                trailing = "QUEUED",
                isCompleted = false,
                isInProgress = true
            )
        }

        Spacer(Modifier.height(16.dp))

        Text(
            "Please do not close this screen.",
            color = StarPayColors.TextSecondary,
            fontSize = 12.sp,
            textAlign = TextAlign.Center
        )
    }
}

@Composable
private fun ChecklistItem(
    label: String,
    trailing: String,
    isCompleted: Boolean,
    isInProgress: Boolean
) {
    val transition = rememberInfiniteTransition(label = "check")
    val spin by transition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(tween(1000, easing = LinearEasing)),
        label = "spin"
    )
    val blink by transition.animateFloat(
        initialValue = 0.5f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(900), RepeatMode.Reverse),
        label = "blink"
    )

    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(20.dp)
                .clip(CircleShape)
                .background(
                    if (isInProgress) StarPayColors.BrandViolet.copy(alpha = 0.22f)
                    else if (isCompleted) StarPayColors.Cyan.copy(alpha = 0.2f)
                    else StarPayColors.Surface3
                ),
            contentAlignment = Alignment.Center
        ) {
            if (isCompleted) {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = null,
                    tint = StarPayColors.Cyan,
                    modifier = Modifier.size(14.dp)
                )
            } else if (isInProgress) {
                Icon(
                    imageVector = Icons.Default.Sync,
                    contentDescription = null,
                    tint = StarPayColors.BrandVioletLight,
                    modifier = Modifier
                        .size(14.dp)
                        .rotate(spin)
                )
            } else {
                Icon(
                    imageVector = Icons.Default.RadioButtonUnchecked,
                    contentDescription = null,
                    tint = StarPayColors.TextMuted,
                    modifier = Modifier.size(14.dp)
                )
            }
        }
        Spacer(Modifier.width(12.dp))
        Text(
            label,
            color = if (isInProgress) StarPayColors.BrandVioletLight else StarPayColors.TextPrimary,
            fontSize = 13.sp,
            fontWeight = FontWeight.Medium,
            modifier = Modifier
                .weight(1f)
                .alpha(if (isInProgress) blink else 1f)
        )
        Spacer(Modifier.width(8.dp))
        Text(
            trailing,
            color = if (isInProgress) StarPayColors.BrandVioletLight else StarPayColors.Cyan,
            fontFamily = StarPayFonts.Monospace,
            fontSize = 11.sp,
            letterSpacing = 0.5.sp,
            modifier = Modifier.alpha(if (isInProgress) blink else 1f)
        )
    }
}

// -------------------------------------------------------------------------------------------------
// State C: Manual UTR ModalBottomSheet
// -------------------------------------------------------------------------------------------------

/** Displays the raw 12 digits as `0000 0000 0000` without altering the stored value. */
private object UtrGroupTransformation : VisualTransformation {
    override fun filter(text: AnnotatedString): TransformedText {
        val raw = text.text
        val grouped = buildString {
            raw.forEachIndexed { index, ch ->
                if (index > 0 && index % 4 == 0) append(' ')
                append(ch)
            }
        }
        val mapping = object : OffsetMapping {
            override fun originalToTransformed(offset: Int): Int =
                offset + if (offset > 0) (offset - 1) / 4 else 0

            override fun transformedToOriginal(offset: Int): Int =
                (offset - offset / 5).coerceIn(0, raw.length)
        }
        return TransformedText(AnnotatedString(grouped), mapping)
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ManualUtrBottomSheet(
    utrInput: String,
    utrNotes: String,
    utrError: String?,
    isSubmitting: Boolean,
    onUtrChange: (String) -> Unit,
    onNotesChange: (String) -> Unit,
    onSubmit: () -> Unit,
    onDismiss: () -> Unit
) {
    var showGuide by remember { mutableStateOf(false) }
    val isComplete = utrInput.length == 12
    val canSubmit = isComplete && !isSubmitting

    ModalBottomSheet(
        onDismissRequest = onDismiss,
        containerColor = StarPayColors.Surface1,
        shape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp),
        dragHandle = {
            Box(
                modifier = Modifier
                    .padding(top = 12.dp, bottom = 4.dp)
                    .size(width = 48.dp, height = 6.dp)
                    .clip(CircleShape)
                    .background(Color.White.copy(alpha = 0.2f))
            )
        }
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 16.dp)
                .padding(top = 8.dp, bottom = 24.dp)
                .navigationBarsPadding()
        ) {
            // Sheet header
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.Top
            ) {
                Column(modifier = Modifier.weight(1f).padding(end = 12.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(8.dp)
                                .clip(CircleShape)
                                .background(StarPayColors.BrandViolet)
                        )
                        Spacer(Modifier.width(8.dp))
                        Text(
                            "EXPEDITED INSTANT CLEARANCE",
                            color = StarPayColors.BrandVioletLight,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 1.sp
                        )
                    }
                    Spacer(Modifier.height(4.dp))
                    Text(
                        "Submit Payment Details",
                        color = StarPayColors.TextPrimary,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(Modifier.height(4.dp))
                    Text(
                        "Enter the 12-digit UTR / UPI Reference Number from your UPI app receipt to expedite confirmation.",
                        color = StarPayColors.TextSecondary,
                        fontSize = 13.sp,
                        lineHeight = 18.sp
                    )
                }
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .clip(CircleShape)
                        .background(StarPayColors.Surface2)
                        .clickable(onClick = onDismiss),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "Close",
                        tint = StarPayColors.TextSecondary,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }

            Spacer(Modifier.height(20.dp))

            // UTR field label + counter
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        "UPI Transaction ID / 12-Digit UTR",
                        color = StarPayColors.TextPrimary,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium
                    )
                    Spacer(Modifier.width(6.dp))
                    Icon(
                        imageVector = Icons.Default.Info,
                        contentDescription = null,
                        tint = StarPayColors.TextMuted,
                        modifier = Modifier.size(15.dp)
                    )
                }
                Text(
                    "${utrInput.length}/12",
                    color = if (isComplete) StarPayColors.Cyan else StarPayColors.TextSecondary,
                    fontFamily = StarPayFonts.Monospace,
                    fontSize = 11.sp
                )
            }

            Spacer(Modifier.height(8.dp))

            // UTR segmented container
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(StarPayColors.Surface2)
                    .border(
                        width = 1.dp,
                        color = when {
                            utrError != null -> StarPayColors.Red.copy(alpha = 0.7f)
                            isComplete -> StarPayColors.CyanBorder
                            else -> Color.Transparent
                        },
                        shape = RoundedCornerShape(12.dp)
                    )
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Tag,
                    contentDescription = null,
                    tint = StarPayColors.Cyan,
                    modifier = Modifier.size(22.dp)
                )
                Spacer(Modifier.width(12.dp))
                BasicTextField(
                    value = utrInput,
                    onValueChange = onUtrChange,
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    visualTransformation = UtrGroupTransformation,
                    cursorBrush = SolidColor(StarPayColors.Cyan),
                    textStyle = LocalTextStyle.current.copy(
                        color = StarPayColors.TextPrimary,
                        fontFamily = StarPayFonts.Monospace,
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp,
                        letterSpacing = 1.5.sp
                    ),
                    decorationBox = { innerTextField ->
                        Box(contentAlignment = Alignment.CenterStart) {
                            if (utrInput.isEmpty()) {
                                Text(
                                    "0000 0000 0000",
                                    color = StarPayColors.TextMuted,
                                    fontFamily = StarPayFonts.Monospace,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 18.sp,
                                    letterSpacing = 1.5.sp
                                )
                            }
                            innerTextField()
                        }
                    },
                    modifier = Modifier.weight(1f)
                )
                if (isComplete) {
                    Spacer(Modifier.width(8.dp))
                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(StarPayColors.Surface3)
                            .padding(horizontal = 8.dp, vertical = 3.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.CheckCircle,
                            contentDescription = null,
                            tint = StarPayColors.Cyan,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(Modifier.width(4.dp))
                        Text(
                            "VALID",
                            color = StarPayColors.Cyan,
                            fontFamily = StarPayFonts.Monospace,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            Spacer(Modifier.height(8.dp))

            // Helper / error line
            Row(
                modifier = Modifier.padding(horizontal = 4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = if (utrError != null) Icons.Default.Info else Icons.Default.Verified,
                    contentDescription = null,
                    tint = when {
                        utrError != null -> StarPayColors.Red
                        isComplete -> StarPayColors.Cyan
                        else -> StarPayColors.TextMuted
                    },
                    modifier = Modifier.size(14.dp)
                )
                Spacer(Modifier.width(6.dp))
                Text(
                    text = utrError
                        ?: if (isComplete) "Valid 12-digit format • Found in Google Pay / PhonePe transaction receipt"
                        else "Found in your Google Pay / PhonePe transaction receipt",
                    color = if (utrError != null) StarPayColors.Red else StarPayColors.TextSecondary,
                    fontSize = 11.sp,
                    lineHeight = 15.sp
                )
            }

            Spacer(Modifier.height(16.dp))

            // Optional payment source / notes
            Text(
                "Payment Source (Optional)",
                color = StarPayColors.TextSecondary,
                fontSize = 12.sp,
                fontWeight = FontWeight.Medium
            )
            Spacer(Modifier.height(8.dp))
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(StarPayColors.Surface2)
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(28.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(StarPayColors.BrandViolet.copy(alpha = 0.2f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AccountBalanceWallet,
                        contentDescription = null,
                        tint = StarPayColors.BrandVioletLight,
                        modifier = Modifier.size(18.dp)
                    )
                }
                Spacer(Modifier.width(12.dp))
                BasicTextField(
                    value = utrNotes,
                    onValueChange = onNotesChange,
                    singleLine = true,
                    cursorBrush = SolidColor(StarPayColors.Cyan),
                    textStyle = LocalTextStyle.current.copy(
                        color = StarPayColors.TextPrimary,
                        fontSize = 14.sp
                    ),
                    decorationBox = { innerTextField ->
                        Box(contentAlignment = Alignment.CenterStart) {
                            if (utrNotes.isEmpty()) {
                                Text(
                                    "e.g. Paid via PhonePe",
                                    color = StarPayColors.TextMuted,
                                    fontSize = 14.sp
                                )
                            }
                            innerTextField()
                        }
                    },
                    modifier = Modifier.weight(1f)
                )
            }

            Spacer(Modifier.height(16.dp))

            // Sacred assurance micro-banner
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(StarPayColors.Surface2)
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .clip(CircleShape)
                        .background(StarPayColors.Amber.copy(alpha = 0.18f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.TempleHindu,
                        contentDescription = null,
                        tint = StarPayColors.Amber,
                        modifier = Modifier.size(18.dp)
                    )
                }
                Spacer(Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        "IMMEDIATE RITUAL ALLOCATION",
                        color = StarPayColors.Amber,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.SemiBold,
                        letterSpacing = 0.8.sp
                    )
                    Text(
                        "Submitting UTR locks your auspicious astrological alignment slot instantly.",
                        color = StarPayColors.TextSecondary,
                        fontSize = 11.sp,
                        lineHeight = 15.sp
                    )
                }
            }

            Spacer(Modifier.height(20.dp))

            // Primary CTA
            Button(
                onClick = onSubmit,
                enabled = canSubmit,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.Transparent,
                    disabledContainerColor = Color.Transparent
                ),
                contentPadding = PaddingValues(0.dp)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            if (canSubmit || isSubmitting) StarPayColors.CtaGradient
                            else SolidColor(StarPayColors.Surface2)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    if (isSubmitting) {
                        CircularProgressIndicator(
                            color = Color.White,
                            strokeWidth = 2.dp,
                            modifier = Modifier.size(24.dp)
                        )
                    } else {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                "Submit for Verification",
                                color = if (isComplete) Color.White else StarPayColors.TextMuted,
                                fontWeight = FontWeight.Bold,
                                fontSize = 15.sp,
                                letterSpacing = 0.3.sp
                            )
                            Spacer(Modifier.width(8.dp))
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                                contentDescription = null,
                                tint = if (isComplete) Color.White else StarPayColors.TextMuted,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                    }
                }
            }

            Spacer(Modifier.height(12.dp))

            // Help + encryption footer
            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Row(
                    modifier = Modifier
                        .clip(RoundedCornerShape(8.dp))
                        .clickable { showGuide = !showGuide }
                        .padding(horizontal = 8.dp, vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Info,
                        contentDescription = null,
                        tint = StarPayColors.BrandVioletLight,
                        modifier = Modifier.size(15.dp)
                    )
                    Spacer(Modifier.width(6.dp))
                    Text(
                        "Need help finding UTR? View guide",
                        color = StarPayColors.BrandVioletLight,
                        fontSize = 13.sp
                    )
                }
                if (showGuide) {
                    Text(
                        "Open your UPI app → Payment history → tap this transaction → copy the 12-digit \"UPI Ref / UTR\" number.",
                        color = StarPayColors.TextSecondary,
                        fontSize = 12.sp,
                        lineHeight = 17.sp,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp)
                    )
                }
                Spacer(Modifier.height(6.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Shield,
                        contentDescription = null,
                        tint = StarPayColors.TextMuted,
                        modifier = Modifier.size(13.dp)
                    )
                    Spacer(Modifier.width(4.dp))
                    Text(
                        "Protected by StarPay 256-bit NPCI Encryption Protocol",
                        color = StarPayColors.TextMuted,
                        fontSize = 10.sp
                    )
                }
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// State D: Pending Verification View
// -------------------------------------------------------------------------------------------------
@Composable
private fun PendingVerificationView(
    order: StarPayOrderDetails,
    onOpenManualUtr: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(72.dp)
                .clip(CircleShape)
                .background(StarPayColors.AmberSoft)
                .border(1.dp, StarPayColors.Amber.copy(alpha = 0.3f), CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.HourglassTop,
                contentDescription = null,
                tint = StarPayColors.Amber,
                modifier = Modifier.size(36.dp)
            )
        }

        Spacer(Modifier.height(20.dp))

        Text(
            "Payment Under Review",
            color = StarPayColors.TextPrimary,
            fontSize = 22.sp,
            fontWeight = FontWeight.Bold
        )

        Spacer(Modifier.height(8.dp))

        Text(
            "Your payment details have been submitted. Our team is verifying your transaction — this screen will update automatically once approved.",
            color = StarPayColors.TextSecondary,
            fontSize = 14.sp,
            textAlign = TextAlign.Center,
            lineHeight = 20.sp
        )

        Spacer(Modifier.height(24.dp))

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(StarPayColors.Surface1)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            SummaryRow("Order Ref", order.orderRef, isMono = true)
            SummaryRow("Amount", "₹${formatAmount(order.reservedAmount)}", isHighlight = true)
            SummaryRow("Status", "PENDING VERIFICATION", isStatus = true)
        }

        Spacer(Modifier.height(20.dp))

        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            CircularProgressIndicator(
                color = StarPayColors.Amber,
                strokeWidth = 2.dp,
                modifier = Modifier.size(16.dp)
            )
            Spacer(Modifier.width(8.dp))
            Text("Waiting for admin approval...", color = StarPayColors.TextSecondary, fontSize = 12.sp)
        }
    }
}

// -------------------------------------------------------------------------------------------------
// State E: Paid (Native Payment Success View)
// -------------------------------------------------------------------------------------------------
@Composable
private fun PaidSuccessView(
    order: StarPayOrderDetails,
    onContinue: () -> Unit,
    onContinueShopping: () -> Unit,
    onCopy: (String, String) -> Unit
) {
    var visible by remember { mutableStateOf(false) }
    LaunchedEffect(Unit) {
        visible = true
    }

    val transition = rememberInfiniteTransition(label = "success")
    val ping by transition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(1800, easing = LinearOutSlowInEasing)),
        label = "ping"
    )
    val pulse by transition.animateFloat(
        initialValue = 0.4f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(1400, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "pulse"
    )
    val bounce by transition.animateFloat(
        initialValue = -3f,
        targetValue = 3f,
        animationSpec = infiniteRepeatable(tween(700, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "bounce"
    )
    val spin by transition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(tween(2400, easing = LinearEasing)),
        label = "spin"
    )

    val emblemScale = remember { Animatable(0.4f) }
    val checkProgress = remember { Animatable(0f) }
    LaunchedEffect(Unit) {
        emblemScale.animateTo(
            1f,
            spring(dampingRatio = Spring.DampingRatioMediumBouncy, stiffness = Spring.StiffnessLow)
        )
    }
    LaunchedEffect(Unit) {
        delay(250)
        checkProgress.animateTo(1f, tween(650, easing = FastOutSlowInEasing))
    }

    AnimatedVisibility(
        visible = visible,
        enter = fadeIn(tween(450)) + slideInVertically(tween(450)) { it / 14 }
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .drawBehind {
                    val glowCenter = Offset(size.width / 2f, size.height * 0.08f)
                    drawCircle(
                        brush = Brush.radialGradient(
                            colors = listOf(StarPayColors.Cyan.copy(alpha = 0.16f), Color.Transparent),
                            center = glowCenter,
                            radius = size.width * 0.75f
                        ),
                        radius = size.width * 0.75f,
                        center = glowCenter
                    )
                }
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 16.dp, vertical = 12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Animated hero graphic
            Box(
                modifier = Modifier.size(150.dp),
                contentAlignment = Alignment.Center
            ) {
                Box(
                    modifier = Modifier
                        .size(128.dp)
                        .scale(0.7f + 0.3f * ping)
                        .alpha(0.35f * (1f - ping))
                        .clip(CircleShape)
                        .background(StarPayColors.Cyan.copy(alpha = 0.5f))
                )
                Box(
                    modifier = Modifier
                        .size(112.dp)
                        .alpha(0.3f * pulse)
                        .clip(CircleShape)
                        .background(StarPayColors.Cyan.copy(alpha = 0.4f))
                )
                // Constellation sparkles
                Icon(
                    imageVector = Icons.Default.AutoAwesome,
                    contentDescription = null,
                    tint = StarPayColors.Amber,
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .padding(top = 14.dp, end = 10.dp)
                        .offset(y = bounce.dp)
                        .size(18.dp)
                )
                Icon(
                    imageVector = Icons.Default.AutoAwesome,
                    contentDescription = null,
                    tint = StarPayColors.Cyan,
                    modifier = Modifier
                        .align(Alignment.BottomStart)
                        .padding(bottom = 22.dp, start = 8.dp)
                        .alpha(pulse)
                        .size(16.dp)
                )
                Icon(
                    imageVector = Icons.Default.Star,
                    contentDescription = null,
                    tint = StarPayColors.BrandVioletLight,
                    modifier = Modifier
                        .align(Alignment.BottomEnd)
                        .padding(bottom = 16.dp, end = 26.dp)
                        .size(14.dp)
                )
                // Primary success emblem
                Box(
                    modifier = Modifier
                        .size(88.dp)
                        .scale(emblemScale.value)
                        .shadow(
                            elevation = 24.dp,
                            shape = CircleShape
                        )
                        .clip(CircleShape)
                        .background(StarPayColors.Surface2),
                    contentAlignment = Alignment.Center
                ) {
                    Box(
                        modifier = Modifier
                            .size(64.dp)
                            .clip(CircleShape)
                            .background(StarPayColors.Cyan.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        // Self-drawing checkmark
                        Canvas(modifier = Modifier.size(34.dp)) {
                            val path = Path().apply {
                                moveTo(size.width * 0.14f, size.height * 0.54f)
                                lineTo(size.width * 0.40f, size.height * 0.78f)
                                lineTo(size.width * 0.86f, size.height * 0.24f)
                            }
                            val measure = PathMeasure()
                            measure.setPath(path, false)
                            val segment = Path()
                            measure.getSegment(0f, measure.length * checkProgress.value, segment, true)
                            drawPath(
                                path = segment,
                                color = StarPayColors.Cyan,
                                style = Stroke(
                                    width = 5.dp.toPx(),
                                    cap = StrokeCap.Round,
                                    join = StrokeJoin.Round
                                )
                            )
                        }
                    }
                }
            }

            Spacer(Modifier.height(8.dp))

            // Headline & status
            Row(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(StarPayColors.Surface2)
                    .padding(horizontal = 12.dp, vertical = 5.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(6.dp)
                        .alpha(pulse)
                        .clip(CircleShape)
                        .background(StarPayColors.Cyan)
                )
                Spacer(Modifier.width(8.dp))
                Text(
                    "BANK GATEWAY CONFIRMED",
                    color = StarPayColors.Cyan,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.2.sp
                )
            }

            Spacer(Modifier.height(12.dp))

            Text(
                "Payment Successful!",
                color = StarPayColors.TextPrimary,
                fontSize = 28.sp,
                fontWeight = FontWeight.ExtraBold,
                textAlign = TextAlign.Center
            )

            Spacer(Modifier.height(6.dp))

            Text(
                text = buildAnnotatedString {
                    append("Your payment of ")
                    withStyle(
                        SpanStyle(
                            color = StarPayColors.Cyan,
                            fontFamily = StarPayFonts.Monospace,
                            fontWeight = FontWeight.SemiBold
                        )
                    ) {
                        append("₹${formatAmount(order.reservedAmount)}")
                    }
                    append(" has been verified and settled securely via StarPay UPI.")
                },
                color = StarPayColors.TextSecondary,
                fontSize = 13.sp,
                lineHeight = 19.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 16.dp)
            )

            Spacer(Modifier.height(20.dp))

            // Order card
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(StarPayColors.Surface1)
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(56.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(Brush.linearGradient(listOf(StarPayColors.BrandViolet.copy(alpha = 0.35f), StarPayColors.Cyan.copy(alpha = 0.25f)))),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Spa,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(28.dp)
                    )
                }
                Spacer(Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.WorkspacePremium,
                            contentDescription = null,
                            tint = StarPayColors.Amber,
                            modifier = Modifier.size(14.dp)
                        )
                        Spacer(Modifier.width(4.dp))
                        Text(
                            "ORDER CONFIRMED",
                            color = StarPayColors.Amber,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.SemiBold,
                            letterSpacing = 0.8.sp
                        )
                    }
                    Text(
                        order.description?.takeIf { it.isNotBlank() } ?: "Ayurdhara Divya Shakti Order",
                        color = StarPayColors.TextPrimary,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.SemiBold,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                    Text(
                        "Ayurdhara Ashram • ${order.orderRef}",
                        color = StarPayColors.TextSecondary,
                        fontSize = 12.sp,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            Spacer(Modifier.height(16.dp))

            // Receipt summary card
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .shadow(8.dp, RoundedCornerShape(16.dp))
                    .clip(RoundedCornerShape(16.dp))
                    .background(StarPayColors.Surface2)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.ReceiptLong,
                            contentDescription = null,
                            tint = StarPayColors.BrandVioletLight,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(Modifier.width(8.dp))
                        Text(
                            "TRANSACTION RECEIPT",
                            color = StarPayColors.TextSecondary,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            letterSpacing = 0.8.sp
                        )
                    }
                    Text(
                        formatReceiptTime(order.paidAt),
                        color = StarPayColors.TextSecondary,
                        fontFamily = StarPayFonts.Monospace,
                        fontSize = 11.sp
                    )
                }

                HorizontalDivider(color = StarPayColors.Surface3)

                ReceiptRow(label = "Order Reference") {
                    Text(
                        order.orderRef,
                        color = StarPayColors.TextPrimary,
                        fontFamily = StarPayFonts.Monospace,
                        fontSize = 13.sp
                    )
                    Spacer(Modifier.width(8.dp))
                    Icon(
                        imageVector = Icons.Default.ContentCopy,
                        contentDescription = "Copy order reference",
                        tint = StarPayColors.TextSecondary,
                        modifier = Modifier
                            .size(16.dp)
                            .clickable { onCopy(order.orderRef, "Order reference") }
                    )
                }

                ReceiptRow(label = "Amount Paid") {
                    Text(
                        "₹${formatAmount(order.reservedAmount)}",
                        color = StarPayColors.Cyan,
                        fontFamily = StarPayFonts.Monospace,
                        fontWeight = FontWeight.Bold,
                        fontSize = 22.sp
                    )
                }

                if (!order.upiTxnRef.isNullOrBlank()) {
                    ReceiptRow(label = "UPI Ref / UTR") {
                        Text(
                            order.upiTxnRef,
                            color = StarPayColors.TextPrimary,
                            fontFamily = StarPayFonts.Monospace,
                            fontSize = 13.sp,
                            letterSpacing = 0.8.sp
                        )
                        Spacer(Modifier.width(6.dp))
                        Icon(
                            imageVector = Icons.Default.Verified,
                            contentDescription = null,
                            tint = StarPayColors.Cyan,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }

                ReceiptRow(label = "Payment Mode") {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(StarPayColors.Cyan)
                    )
                    Spacer(Modifier.width(8.dp))
                    Text(
                        "StarPay UPI",
                        color = StarPayColors.TextPrimary,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }

                ReceiptRow(label = "Network Status") {
                    Row(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(StarPayColors.CyanSoft)
                            .padding(horizontal = 10.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.Check,
                            contentDescription = null,
                            tint = StarPayColors.Cyan,
                            modifier = Modifier.size(14.dp)
                        )
                        Spacer(Modifier.width(4.dp))
                        Text(
                            "VERIFIED",
                            color = StarPayColors.Cyan,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.8.sp
                        )
                    }
                }
            }

            Spacer(Modifier.height(16.dp))

            // Sacred provenance + order journey preview
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(StarPayColors.Surface1)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        modifier = Modifier.weight(1f),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.Spa,
                            contentDescription = null,
                            tint = StarPayColors.Amber,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(Modifier.width(8.dp))
                        Text(
                            "Sacred Provenance",
                            color = StarPayColors.TextPrimary,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                    Text(
                        "CONSECRATION BEGUN",
                        color = StarPayColors.Amber,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.8.sp,
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(StarPayColors.AmberSoft)
                            .padding(horizontal = 8.dp, vertical = 3.dp)
                    )
                }
                Text(
                    "Our temple priests in Haridwar will align this preparation under the auspicious Shukla Paksha muhurta before packaging.",
                    color = StarPayColors.TextSecondary,
                    fontSize = 12.sp,
                    lineHeight = 17.sp
                )
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 4.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    JourneyStep(
                        label = "Paid",
                        modifier = Modifier.weight(1f),
                        circleColor = StarPayColors.Cyan,
                        labelColor = StarPayColors.Cyan
                    ) {
                        Icon(Icons.Default.Check, null, tint = StarPayColors.OnCyan, modifier = Modifier.size(14.dp))
                    }
                    JourneyStep(
                        label = "Ritual",
                        modifier = Modifier.weight(1f),
                        circleColor = StarPayColors.Amber.copy(alpha = 0.2f),
                        labelColor = StarPayColors.Amber
                    ) {
                        Icon(
                            Icons.Default.Cyclone, null,
                            tint = StarPayColors.Amber,
                            modifier = Modifier
                                .size(14.dp)
                                .rotate(spin)
                        )
                    }
                    JourneyStep(
                        label = "Pack",
                        modifier = Modifier.weight(1f),
                        circleColor = StarPayColors.Surface3,
                        labelColor = StarPayColors.TextMuted
                    ) {
                        Icon(Icons.Default.Inventory2, null, tint = StarPayColors.TextMuted, modifier = Modifier.size(14.dp))
                    }
                    JourneyStep(
                        label = "Transit",
                        modifier = Modifier.weight(1f),
                        circleColor = StarPayColors.Surface3,
                        labelColor = StarPayColors.TextMuted
                    ) {
                        Icon(Icons.Default.LocalShipping, null, tint = StarPayColors.TextMuted, modifier = Modifier.size(14.dp))
                    }
                }
            }

            Spacer(Modifier.height(16.dp))

            // Assurance tagline
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = Icons.Default.VerifiedUser,
                    contentDescription = null,
                    tint = StarPayColors.Cyan,
                    modifier = Modifier.size(16.dp)
                )
                Spacer(Modifier.width(8.dp))
                Text(
                    "Authentic Vedic Sourcing Guaranteed • Dispatches within 24h",
                    color = StarPayColors.TextSecondary,
                    fontSize = 12.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.weight(1f, fill = false)
                )
            }

            Spacer(Modifier.height(24.dp))

            // Actions
            Button(
                onClick = onContinue,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp)
                    .shadow(
                        elevation = 12.dp,
                        shape = RoundedCornerShape(14.dp)
                    ),
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(containerColor = StarPayColors.Cyan)
            ) {
                Text(
                    "View Order Details & Tracking",
                    color = StarPayColors.OnCyan,
                    fontWeight = FontWeight.Bold,
                    fontSize = 15.sp
                )
                Spacer(Modifier.width(8.dp))
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null,
                    tint = StarPayColors.OnCyan,
                    modifier = Modifier.size(20.dp)
                )
            }

            Spacer(Modifier.height(12.dp))

            Button(
                onClick = onContinueShopping,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(44.dp),
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(containerColor = StarPayColors.Surface2)
            ) {
                Text(
                    "Continue Shopping",
                    color = StarPayColors.TextPrimary,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Medium
                )
            }

            Spacer(Modifier.height(16.dp))
        }
    }
}

@Composable
private fun ReceiptRow(
    label: String,
    value: @Composable RowScope.() -> Unit
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(label, color = StarPayColors.TextSecondary, fontSize = 13.sp)
        Row(verticalAlignment = Alignment.CenterVertically, content = value)
    }
}

@Composable
private fun JourneyStep(
    label: String,
    modifier: Modifier = Modifier,
    circleColor: Color,
    labelColor: Color,
    icon: @Composable () -> Unit
) {
    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        Box(
            modifier = Modifier
                .size(28.dp)
                .clip(CircleShape)
                .background(circleColor),
            contentAlignment = Alignment.Center
        ) {
            icon()
        }
        Text(label, color = labelColor, fontSize = 10.sp, fontWeight = FontWeight.Medium)
    }
}

// -------------------------------------------------------------------------------------------------
// State F: Failed / Expired View
// -------------------------------------------------------------------------------------------------
@Composable
private fun FailedView(
    order: StarPayOrderDetails?,
    errorMessage: String,
    onRetry: () -> Unit,
    onSubmitUtr: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(72.dp)
                .clip(CircleShape)
                .background(StarPayColors.RedSoft)
                .border(1.dp, StarPayColors.Red.copy(alpha = 0.3f), CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Close,
                contentDescription = null,
                tint = StarPayColors.Red,
                modifier = Modifier.size(36.dp)
            )
        }

        Spacer(Modifier.height(20.dp))

        Text(
            "Payment Session Expired",
            color = StarPayColors.TextPrimary,
            fontSize = 22.sp,
            fontWeight = FontWeight.Bold
        )

        Spacer(Modifier.height(8.dp))

        Text(
            errorMessage.ifBlank { "This payment request has expired or failed. If money was deducted, please submit your UTR or contact support." },
            color = StarPayColors.TextSecondary,
            fontSize = 14.sp,
            textAlign = TextAlign.Center,
            lineHeight = 20.sp
        )

        Spacer(Modifier.height(28.dp))

        Button(
            onClick = onRetry,
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp),
            shape = RoundedCornerShape(14.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
            contentPadding = PaddingValues(0.dp)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(StarPayColors.CtaGradient),
                contentAlignment = Alignment.Center
            ) {
                Text("Retry / Create New Payment", color = Color.White, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(Modifier.height(12.dp))

        OutlinedButton(
            onClick = onSubmitUtr,
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            shape = RoundedCornerShape(14.dp),
            border = BorderStroke(1.dp, StarPayColors.BorderSubtle)
        ) {
            Text("Money Deducted? Submit UTR", color = StarPayColors.BrandVioletLight)
        }
    }
}

// -------------------------------------------------------------------------------------------------
// Helpers & Subcomponents
// -------------------------------------------------------------------------------------------------
@Composable
private fun SummaryRow(
    label: String,
    value: String,
    isMono: Boolean = false,
    isHighlight: Boolean = false,
    isSuccess: Boolean = false,
    isStatus: Boolean = false
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(label, color = StarPayColors.TextSecondary, fontSize = 13.sp)
        Text(
            value,
            color = when {
                isSuccess -> StarPayColors.Cyan
                isStatus -> StarPayColors.Amber
                isHighlight -> StarPayColors.Cyan
                else -> StarPayColors.TextPrimary
            },
            fontFamily = if (isMono || isHighlight) StarPayFonts.Monospace else null,
            fontWeight = if (isHighlight || isSuccess || isStatus) FontWeight.Bold else FontWeight.Medium,
            fontSize = if (isHighlight) 15.sp else 13.sp
        )
    }
}

/** "%.2f" with a locale-independent decimal separator. */
private fun formatAmount(amount: Double): String = String.format(Locale.US, "%.2f", amount)

/** Splits an amount into whole rupees and paise (rounded, so 997.42 never becomes 997.41). */
private fun splitAmount(amount: Double): Pair<Long, Int> {
    val totalPaise = Math.round(amount * 100.0)
    return Pair(totalPaise / 100, (totalPaise % 100).toInt())
}

/** Formats the ISO-8601 `paidAt` timestamp for the receipt header; falls back to "now". */
private fun formatReceiptTime(paidAt: String?): String {
    val out = SimpleDateFormat("dd MMM, hh:mm a", Locale.US)
    val parsed: Date? = try {
        if (paidAt.isNullOrBlank() || paidAt.length < 19) null
        else SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.US)
            .apply { timeZone = TimeZone.getTimeZone("UTC") }
            .parse(paidAt.substring(0, 19))
    } catch (e: Exception) {
        null
    }
    return out.format(parsed ?: Date())
}

private fun decodeBase64ToBitmap(dataUrl: String): ImageBitmap? {
    return try {
        val base64Clean = if (dataUrl.contains(",")) {
            dataUrl.substringAfter(",")
        } else {
            dataUrl
        }
        val decodedBytes = Base64.decode(base64Clean, Base64.DEFAULT)
        val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
        bitmap?.asImageBitmap()
    } catch (e: Exception) {
        null
    }
}

private fun launchUpiApp(
    context: Context,
    packageName: String,
    upiUrl: String,
    onAppNotFound: () -> Unit
) {
    if (upiUrl.isBlank()) return
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(upiUrl)).apply {
            setPackage(packageName)
        }
        context.startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        onAppNotFound()
        launchGenericUpi(context, upiUrl)
    } catch (e: Exception) {
        launchGenericUpi(context, upiUrl)
    }
}

private fun launchGenericUpi(context: Context, upiUrl: String) {
    if (upiUrl.isBlank()) return
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(upiUrl))
        val chooser = Intent.createChooser(intent, "Pay with UPI")
        context.startActivity(chooser)
    } catch (e: Exception) {
        Toast.makeText(context, "No UPI app found on device", Toast.LENGTH_SHORT).show()
    }
}

private fun copyToClipboard(context: Context, text: String, label: String) {
    val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
    val clip = ClipData.newPlainText(label, text)
    clipboard.setPrimaryClip(clip)
    Toast.makeText(context, "$label copied to clipboard", Toast.LENGTH_SHORT).show()
}
