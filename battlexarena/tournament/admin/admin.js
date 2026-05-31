// Firebase Imports
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
        import { getDatabase, ref, get, set, update, push, query, orderByChild, equalTo, onValue, off, remove, serverTimestamp, runTransaction } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
        import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

        // ===============================================================
        // ================= !!! IMPORTANT !!! ===========================
        // Replace the placeholder values below with your actual Firebase project configuration.
        // You can find these details in your Firebase project settings:
        // Project settings > General > Your apps > Web app > SDK setup and configuration > Config
        // ===============================================================
        // BattlexArena - Firebase Config
        // Apna Firebase config yahan paste karo (same as user/app.js)
const firebaseConfig = {
  apiKey: "AIzaSyB_uCSen5vElscLJCxbInuOXzjXM7ghYuE",
  authDomain: "battlexarena-4b07a.firebaseapp.com",
  databaseURL: "https://battlexarena-4b07a-default-rtdb.firebaseio.com",
  projectId: "battlexarena-4b07a",
  storageBucket: "battlexarena-4b07a.firebasestorage.app",
  messagingSenderId: "750106389329",
  appId: "1:750106389329:web:f4e9db3ceafaa552c6c170",
  measurementId: "G-T823ZFL8DL"
};

        // ===============================================================
        // ===============================================================

        // Initialize Firebase
        let app, db, auth;
        try {
            // Check if placeholder values are still present
             if (firebaseConfig.apiKey === "AIzaSyB_uCSen5vElscLJCxbInuOXzjXM7ghYuE" || firebaseConfig.projectId === "battlexarena-4b07a") {
                console.warn("Admin Panel: Firebase config using placeholder values. Replace them with your actual project details.");
                // Optionally prevent initialization or show a UI warning here
                // For this example, we'll allow initialization but log the warning.
             }
             app = initializeApp(firebaseConfig);
             db = getDatabase(app);
             auth = getAuth(app);
             console.log("Admin Panel: Firebase Initialized (check config if using placeholders)");
        } catch (error) {
             console.error("Admin Panel: Firebase initialization failed:", error);
             document.body.innerHTML = `<div class="alert alert-danger m-5"><strong>Critical Error:</strong> Could not connect to Firebase services. Check console, config, and network. Error: ${error.message}</div>`;
        }

        // DOM Elements Cache (Added new elements for dashboard and modals)
        const getElement = (id) => document.getElementById(id);
        const querySel = (selector) => document.querySelector(selector);
        const querySelAll = (selector) => document.querySelectorAll(selector);
        const elements = {
             adminLoader: getElement('adminLoader'),
             authContainer: getElement('auth-container'),
             loginSection: getElement('admin-login-section'),
             setupSection: getElement('admin-setup-section'),
             mainArea: getElement('admin-main-area'),
             adminLoginForm: getElement('adminLoginForm'),
             adminEmailInput: getElement('adminEmail'),
             adminPasswordInput: getElement('adminPassword'),
             adminLoginStatus: getElement('adminLoginStatus'),
             adminSetupForm: getElement('adminSetupForm'),
             setupEmailInput: getElement('setupEmail'),
             setupPasswordInput: getElement('setupPassword'),
             setupStatus: getElement('adminSetupStatus'),
             adminUserEmailDisplay: getElement('adminUserEmailShort'),
             adminLogoutBtn: getElement('adminLogoutBtnHeader'),
             sidebar: getElement('adminSidebar'),
             sidebarLinks: querySelAll('#adminSidebar .nav-link'),
             sections: querySelAll('#adminMainContent .section'),
             adminPageTitle: getElement('adminPageTitle'),
             adminHeaderLogo: getElement('adminHeaderLogo'),
             // Dashboard (Expanded)
             dashboardSection: getElement('dashboard-section'),
             statTotalUsers: getElement('statTotalUsers'),
             statActiveTournaments: getElement('statActiveTournaments'),
             statPendingWithdrawals: getElement('statPendingWithdrawals'),
             statCompletedWithdrawals: getElement('statCompletedWithdrawals'), // New
             statRejectedWithdrawals: getElement('statRejectedWithdrawals'),   // New
             statTotalGames: getElement('statTotalGames'),                   // New
             statTotalPromotions: getElement('statTotalPromotions'),         // New
             statFinishedTournaments: getElement('statFinishedTournaments'), // New
             dashboardStatus: getElement('dashboardStatus'),
             pendingWithdrawalCountBadge: getElement('pendingWithdrawalCountBadge'),
             // Games (Modal elements consolidated)
             gamesTableBody: getElement('gamesTableBody'),
             gameModalEl: getElement('gameModal'), // Renamed modal ID
             gameModalTitle: getElement('gameModalTitle'),
             gameForm: getElement('gameForm'),
             gameEditId: getElement('gameEditId'),
             gameNameInput: getElement('gameName'),
             gameImageFileInput: getElement('gameImageFile'),
             gameImageUrlInput: getElement('gameImageUrl'),
             saveGameBtn: getElement('saveGameBtn'),
             gameStatus: getElement('gameStatus'), // Status within modal
             gamesStatus: getElement('gamesStatus'), // Status in section
             addNewGameBtn: getElement('addNewGameBtn'),
             // Promotions (Modal elements consolidated)
             promotionsTableBody: getElement('promotionsTableBody'),
             promotionModalEl: getElement('promotionModal'), // Renamed modal ID
             promotionModalTitle: getElement('promotionModalTitle'),
             promotionForm: getElement('promotionForm'),
             promotionEditId: getElement('promotionEditId'),
             promoImageFileInput: getElement('promoImageFile'),
             promoImageUrlInput: getElement('promoImageUrl'),
             promoLinkInput: getElement('promoLink'),
             savePromotionBtn: getElement('savePromotionBtn'),
             promotionStatus: getElement('promotionStatus'), // Status within modal
             promotionsStatus: getElement('promotionsStatus'), // Status in section
             addNewPromotionBtn: getElement('addNewPromotionBtn'),
             // Tournaments
             tournamentsTableBody: getElement('tournamentsTableBody'),
             addTournamentModalEl: getElement('addTournamentModal'),
             tournamentForm: getElement('tournamentForm'),
             tournamentModalTitle: getElement('tournamentModalTitle'),
             tournamentEditId: getElement('tournamentEditId'),
             tournamentGameSelect: getElement('tournamentGame'),
             tournamentNameInput: getElement('tournamentName'),
             tournamentStartTimeInput: getElement('tournamentStartTime'),
             tournamentStatusSelect: getElement('tournamentStatus'),
             tournamentEntryFeeInput: getElement('tournamentEntryFee'),
             tournamentPrizePoolInput: getElement('tournamentPrizePool'),
             tournamentPerKillInput: getElement('tournamentPerKill'),
             tournamentMaxPlayersInput: getElement('tournamentMaxPlayers'),
             tournamentTagsInput: getElement('tournamentTags'),
             tournamentMapInput: getElement('tournamentMap'),
             tournamentModeInput: getElement('tournamentMode'),
             tournamentDescriptionInput: getElement('tournamentDescription'),
             tournamentRoomIdInput: getElement('tournamentRoomId'),
             tournamentRoomPasswordInput: getElement('tournamentRoomPassword'),
             tournamentShowIdPassCheckbox: getElement('tournamentShowIdPass'),
             saveTournamentBtn: getElement('saveTournamentBtn'),
             addNewTournamentBtn: getElement('addNewTournamentBtn'),
             addTournamentStatus: getElement('addTournamentStatus'),
             tournamentBannerUrlInput: getElement('tournamentBannerUrl'),
             tournamentsStatus: getElement('tournamentsStatus'),
             // Users
             usersSection: getElement('users-section'),
             usersTableBody: getElement('usersTableBody'),
             userSearchInput: getElement('userSearchInput'),
             userModalEl: getElement('userModal'),
             userModalTitle: getElement('userModalTitle'),
             userDetailUid: getElement('userDetailUid'),
             userDetailEmail: getElement('userDetailEmail'),
             userDetailName: getElement('userDetailName'),
             userDetailCreatedAt: getElement('userDetailCreatedAt'),
             userDetailBalance: getElement('userDetailBalance'),
             userDetailWinning: getElement('userDetailWinning'),
             userDetailBonus: getElement('userDetailBonus'),
             userDetailReferralCode: getElement('userDetailReferralCode'),
             userDetailReferredBy: getElement('userDetailReferredBy'),
             userDetailReferredCount: getElement('userDetailReferredCount'),
             userDetailStatus: getElement('userDetailStatus'),
             updateBalanceForm: getElement('updateBalanceForm'),
             editUserUid: getElement('editUserUid'),
             balanceUpdateAmountInput: getElement('balanceUpdateAmount'),
             balanceUpdateTypeSelect: getElement('balanceUpdateType'),
             balanceUpdateReasonInput: getElement('balanceUpdateReason'),
             balanceUpdateStatus: getElement('balanceUpdateStatus'),
             userBlockBtn: getElement('userBlockBtn'),
             userDeleteBtn: getElement('userDeleteBtn'),
             addUserModalEl: getElement('addUserModal'),
             addUserForm: getElement('addUserForm'),
             newUserNameInput: getElement('newUserName'),
             newUserEmailInput: getElement('newUserEmail'),
             newUserPasswordInput: getElement('newUserPassword'),
             newUserInitialBalanceInput: getElement('newUserInitialBalance'),
             saveNewUserBtn: getElement('saveNewUserBtn'),
             addUserStatus: getElement('addUserStatus'),
             usersStatus: getElement('usersStatus'),
             // Withdrawals
             pendingWithdrawalsTableBody: getElement('pendingWithdrawalsTableBody'),
             completedWithdrawalsTableBody: getElement('completedWithdrawalsTableBody'),
             rejectedWithdrawalsTableBody: getElement('rejectedWithdrawalsTableBody'),
             withdrawalActionModalEl: getElement('withdrawalActionModal'),
             withdrawalDetailId: getElement('withdrawalDetailId'),
             withdrawalDetailUser: getElement('withdrawalDetailUser'),
             withdrawalDetailUserUid: getElement('withdrawalDetailUserUid'),
             withdrawalDetailAmount: getElement('withdrawalDetailAmount'),
             withdrawalDetailMethod: getElement('withdrawalDetailMethod'),
             withdrawalRejectReasonDiv: getElement('withdrawalRejectReasonDiv'),
             withdrawalRejectReasonInput: getElement('withdrawalRejectReason'),
             withdrawalApproveNoteDiv: getElement('withdrawalApproveNoteDiv'),
             withdrawalApproveNoteInput: getElement('withdrawalApproveNote'),
             withdrawalActionStatus: getElement('withdrawalActionStatus'),
             rejectWithdrawalBtn: getElement('rejectWithdrawalBtn'),
             approveWithdrawalBtn: getElement('approveWithdrawalBtn'),
             withdrawalsStatus: getElement('withdrawalsStatus'),
             // Registered Players Modal
             registeredPlayersModalEl: getElement('registeredPlayersModal'),
             registeredPlayersModalTitle: getElement('registeredPlayersModalTitle'),
             registeredPlayersTournamentName: getElement('registeredPlayersTournamentName'),
             registeredPlayersTableBody: getElement('registeredPlayersTableBody'),
             registeredPlayersStatus: getElement('registeredPlayersStatus'),
             // Settings
             settingsSection: getElement('settings-section'),
             appSettingsForm: getElement('appSettingsForm'),
             settingLogoUrlInput: getElement('settingLogoUrl'),
             settingAppNameInput: getElement('settingAppName'),
             settingMinWithdrawInput: getElement('settingMinWithdraw'),
             settingReferralBonusInput: getElement('settingReferralBonus'),
             settingSignupBonusInput: getElement('settingSignupBonus'),
             settingSupportContactInput: getElement('settingSupportContact'),
             settingUpiDetailsInput: getElement('settingUpiDetails'),
             settingPolicyPrivacyInput: getElement('settingPolicyPrivacy'),
             settingPolicyTermsInput: getElement('settingPolicyTerms'),
             settingPolicyRefundInput: getElement('settingPolicyRefund'),
             settingPolicyFairPlayInput: getElement('settingPolicyFairPlay'),
             settingsStatus: getElement('settingsStatus'),
            // NEW THEME ELEMENTS
            themeSection: getElement('theme-section'),
            themeStatus: getElement('themeStatus'),
            customThemeForm: getElement('customThemeForm'),
            themeColorPickers: querySelAll('#customThemeForm input[type="color"]'),
            saveThemeBtn: getElement('saveThemeBtn'),
            resetThemeBtn: getElement('resetThemeBtn'),
            previewDefaultThemeBtn: getElement('previewDefaultThemeBtn'),
            previewCrimsonThemeBtn: getElement('previewCrimsonThemeBtn'),
            previewOceanicThemeBtn: getElement('previewOceanicThemeBtn'),
             // Demo Data
             addDemoDataBtn: getElement('addDemoDataBtn'),
             // Transactions
             transactionsSection: getElement('transactions-section'),
             // Notifications section
             notifTitle: getElement('notifTitle'),
             notifMessage: getElement('notifMessage'),
             notifImageUrl: getElement('notifImageUrl'),
             notifImageFile: getElement('notifImageFile'),
             notifImgbbStatus: getElement('notifImgbbStatus'),
             notifImagePreviewDiv: getElement('notifImagePreviewDiv'),
             notifImagePreview: getElement('notifImagePreview'),
             notifSendStatus: getElement('notifSendStatus'),
             sendNotifBtn: getElement('sendNotifBtn'),
             notifListContainer: getElement('notifListContainer'),
             clearAllNotifsBtn: getElement('clearAllNotifsBtn'),
             // Announcements section
             annMessage: getElement('annMessage'),
             annCreateStatus: getElement('annCreateStatus'),
             saveAnnBtn: getElement('saveAnnBtn'),
             annListContainer: getElement('annListContainer'),
             clearAllAnnsBtn: getElement('clearAllAnnsBtn'),
             // Welcome message
             welcomeTitle: getElement('welcomeTitle'),
             welcomeMessage: getElement('welcomeMessage'),
             welcomeImageUrl: getElement('welcomeImageUrl'),
             welcomeImageFile: getElement('welcomeImageFile'),
             welcomeImgbbStatus: getElement('welcomeImgbbStatus'),
             welcomeMsgStatus: getElement('welcomeMsgStatus'),
             saveWelcomeMsgBtn: getElement('saveWelcomeMsgBtn'),
             // Settings - ImgBB key
             settingImgbbApiKey: getElement('settingImgbbApiKey'),
             // Payment Settings
             pmManualRadio: getElement('pmManual'),
             pmGatewayRadio: getElement('pmGateway'),
             manualPaymentFields: getElement('manualPaymentFields'),
             gatewayPaymentFields: getElement('gatewayPaymentFields'),
             settingPayUpiId: getElement('settingPayUpiId'),
             settingPayQrUrl: getElement('settingPayQrUrl'),
             settingPayInstructions: getElement('settingPayInstructions'),
             settingZapupiUrl: getElement('settingZapupiUrl'),
             settingZapupiKey: getElement('settingZapupiKey'),
             qrUploadInput: getElement('qrUploadInput'),
             qrUploadStatus: getElement('qrUploadStatus'),
             qrPreviewDiv: getElement('qrPreviewDiv'),
             qrPreviewImg: getElement('qrPreviewImg'),
             // Deposits
             depositsTableBody: getElement('depositsTableBody'),
             depositsStatus: getElement('depositsStatus'),
             depositPendingCount: getElement('depositPendingCount'),
             pendingDepositCountBadge: getElement('pendingDepositCountBadge'),
             depositActionModalEl: getElement('depositActionModal'),
             depositDetailId: getElement('depositDetailId'),
             depositDetailUser: getElement('depositDetailUser'),
             depositDetailUid: getElement('depositDetailUid'),
             depositDetailAmount: getElement('depositDetailAmount'),
             depositDetailTxnId: getElement('depositDetailTxnId'),
             depositDetailMethod: getElement('depositDetailMethod'),
             depositScreenshotDiv: getElement('depositScreenshotDiv'),
             depositScreenshotLink: getElement('depositScreenshotLink'),
             depositScreenshotImg: getElement('depositScreenshotImg'),
             depositRejectReasonDiv: getElement('depositRejectReasonDiv'),
             depositRejectReason: getElement('depositRejectReason'),
             depositActionStatus: getElement('depositActionStatus'),
             approveDepositBtn: getElement('approveDepositBtn'),
             rejectDepositBtn: getElement('rejectDepositBtn'),
             // Tournament banner upload
             tournamentBannerFile: getElement('tournamentBannerFile'),
             tournamentBannerImgbbStatus: getElement('tournamentBannerImgbbStatus'),
        };

        // Bootstrap Modal/Offcanvas Instances Cache
        let componentInstances = {}; // Combined cache
        const getComponentInstance = (element, componentType = 'Modal') => {
            if (!element) return null;
            const instanceKey = `${componentType}-${element.id}`;
            if (!componentInstances[instanceKey]) {
                try {
                     if (componentType === 'Modal') componentInstances[instanceKey] = new bootstrap.Modal(element);
                     else if (componentType === 'Offcanvas') componentInstances[instanceKey] = new bootstrap.Offcanvas(element);
                     else if (componentType === 'Tab') componentInstances[instanceKey] = new bootstrap.Tab(element);
                     else if (componentType === 'Alert') componentInstances[instanceKey] = new bootstrap.Alert(element);
                     else if (componentType === 'Toast') componentInstances[instanceKey] = new bootstrap.Toast(element);
                     else { console.warn("Unknown Bootstrap component type:", componentType); return null; }
                } catch (e) {
                    console.error(`Error creating Bootstrap ${componentType} instance for #${element.id}:`, e);
                    return null;
                }
            }
            return componentInstances[instanceKey];
        }
        const getModalInstance = (element) => getComponentInstance(element, 'Modal');
        const getOffcanvasInstance = (element) => getComponentInstance(element, 'Offcanvas');

        // --- App State ---
        let currentAdminUser = null;
        let currentWithdrawalAction = { id: null, type: null, userId: null };
        let currentEditingItemId = null; // Generic ID for editing game/promo
        let currentEditingTournamentId = null;
        let gameDataCache = {}; // { gameId: gameName }
        let userDataCache = {}; // { userId: { displayName, email, status, balance, winningCash } }
        let fullUserDataCache = {}; // { userId: fullUserData } - for search/modal
        let dbListeners = {};
        let isAdminSetupComplete = false;
        let designatedAdminUid = null;
        let appSettings = {};

        // =========================================================================
        // --- NEW: THEME DEFINITIONS ---
        // =========================================================================
        const defaultTheme = {
            '--primary-bg': '#0F172A',
            '--secondary-bg': '#1E293B',
            '--card-bg': '#1E293B',
            '--text-primary': '#E2E8F0',
            '--text-secondary': '#94A3B8',
            '--accent-color': '#FACC15',
            '--primary-button-bg': '#3B82F6',
            '--border-color': '#334155',
        };
        const crimsonTheme = {
            '--primary-bg': '#1a0005',
            '--secondary-bg': '#2e0009',
            '--card-bg': '#2e0009',
            '--text-primary': '#fce7f3',
            '--text-secondary': '#e9a8d9',
            '--accent-color': '#f43f5e',
            '--primary-button-bg': '#be185d',
            '--border-color': '#500724',
        };
        const oceanicTheme = {
            '--primary-bg': '#0c1445',
            '--secondary-bg': '#182157',
            '--card-bg': '#182157',
            '--text-primary': '#e0e7ff',
            '--text-secondary': '#a5b4fc',
            '--accent-color': '#38bdf8',
            '--primary-button-bg': '#4338ca',
            '--border-color': '#312e81',
        };
        // =========================================================================


        // --- Admin Auth & Security ---
        function isDesignatedAdmin(user) {
            // Any authenticated user is admin — no UID restriction
            return !!user;
        }

        // --- Utility Functions ---
        const showLoader = (show) => { if (elements.adminLoader) elements.adminLoader.style.display = show ? 'flex' : 'none'; };

        function showStatus(element, message, type = 'danger', autohide = 5000) {
            if (!element) {
                console.warn("showStatus called with null element for message:", message);
                return;
            }
             const alertId = `status-alert-${element.id || Math.random().toString(36).substring(2)}`;
             element.style.display = 'block';
             element.innerHTML = `<div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">${sanitizeHTML(message)}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;

             if (autohide && typeof autohide === 'number' && autohide > 0) {
                setTimeout(() => {
                    const currentAlert = getElement(alertId);
                    if (currentAlert) {
                        try {
                            const bsAlert = getComponentInstance(currentAlert, 'Alert');
                             if (bsAlert) bsAlert.close();
                             else currentAlert.remove();
                        } catch (e) {
                            console.warn("Error closing alert:", e);
                            currentAlert.remove();
                        }
                    }
                }, autohide);
            }
        }

        function clearStatus(element) {
             if (!element) return;
             element.innerHTML = '';
        }

        const formatDate = (timestamp) => {
            if (!timestamp) return 'N/A';
            if (typeof timestamp === 'object' && timestamp.hasOwnProperty('.sv')) { return 'Pending...'; }
            const tsNumber = Number(timestamp);
            if (isNaN(tsNumber) || tsNumber <= 0) return 'Invalid Date';
            try {
                const date = new Date(tsNumber);
                if (isNaN(date.getTime())) return 'Invalid Date';
                return date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short'});
            } catch (e) { console.warn("Error formatting date:", timestamp, e); return 'Invalid Date'; }
        };

        const formatCurrency = (amount) => {
            const num = Number(amount);
            return isNaN(num) ? '₹--' : `₹${num.toFixed(2)}`;
        }

        function sanitizeHTML(str) {
             if (str == null) return '';
             str = String(str);
             const temp = document.createElement('div');
             temp.textContent = str;
             return temp.innerHTML;
        }

        function copyToClipboard(targetSelector) {
            // Find globally in document since context may vary
            const elements_found = document.querySelectorAll(targetSelector);
            let textToCopy = '';
            if (elements_found.length > 0) {
                textToCopy = elements_found[0]?.textContent?.trim();
            }
            // Fallback: search within nearest modal or table row context
            if (!textToCopy) {
                const activeModal = document.querySelector('.modal.show .modal-body');
                const el = activeModal?.querySelector(targetSelector);
                textToCopy = el?.textContent?.trim();
            }

            if (!textToCopy) { console.warn("Copy target empty or not found:", targetSelector); return; }

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                         const toastEl = document.createElement('div');
                         toastEl.className = 'toast position-fixed bottom-0 end-0 p-3 m-3 text-bg-success border-0';
                         toastEl.setAttribute('role', 'alert'); toastEl.setAttribute('aria-live', 'assertive'); toastEl.setAttribute('aria-atomic', 'true');
                         toastEl.innerHTML = '<div class="toast-body">Copied!</div>';
                         document.body.appendChild(toastEl);
                         const toast = getComponentInstance(toastEl, 'Toast');
                         if(toast) toast.show();
                         toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
                    })
                    .catch(err => { console.warn('Clipboard writeText failed: ', err); alert('Could not copy.'); });
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed"; textArea.style.left = "-9999px"; textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus(); textArea.select();
                try { document.execCommand('copy'); alert('Copied! (fallback)'); }
                catch (err) { console.warn('Fallback copy failed: ', err); alert('Copy failed.'); }
                document.body.removeChild(textArea);
            }
        }

        const tableLoadingPlaceholderHtml = (cols) => `<tr class="loading-placeholder"><td colspan="${cols}"><div class="placeholder w-100 py-3"></div></td></tr>`.repeat(3);

        // --- UI Functions ---
        function showAdminSection(sectionId) {
             elements.sections.forEach(sec => sec.classList.remove('active'));
             const targetSection = getElement(sectionId);
             if (targetSection) {
                 targetSection.classList.add('active');
                 const linkElement = querySel(`#adminSidebar .nav-link[data-section="${sectionId}"]`);
                 let title = 'Admin Panel';
                 if (linkElement) {
                     const linkText = linkElement.textContent.trim() || sectionId.replace('-section', '').replace('-', ' ');
                     title = linkText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                     const badge = linkElement.querySelector('.badge');
                     if (badge) { title = title.replace(badge.textContent, '').trim(); }
                 }

                 if(elements.adminPageTitle) elements.adminPageTitle.textContent = title;
                 elements.sidebarLinks?.forEach(link => { link.classList.toggle('active', link.dataset.section === sectionId); });

                 loadDataForSection(sectionId); // Load data when section becomes active

                 const sidebar = getOffcanvasInstance(elements.sidebar);
                 if (sidebar?._isShown) sidebar.hide();
             } else {
                 console.error("Section element not found:", sectionId);
                 showAdminSection('dashboard-section'); // Fallback
             }
        }

        function loadDataForSection(sectionId) {
             if (!currentAdminUser || !isDesignatedAdmin(currentAdminUser)) {
                 console.warn("Attempted to load data without proper admin authorization.");
                 showStatus(elements.dashboardStatus, "Admin not authorized.", "danger", false);
                 return;
             }
             console.log(`Loading data for section: ${sectionId}`);

             // Clear status areas for all potentially visible sections
             clearStatus(elements.dashboardStatus); clearStatus(elements.gamesStatus); clearStatus(elements.promotionsStatus);
             clearStatus(elements.tournamentsStatus); clearStatus(elements.usersStatus); clearStatus(elements.withdrawalsStatus);
             clearStatus(elements.settingsStatus);
             clearStatus(elements.themeStatus); // Clear theme status

             switch(sectionId) {
                 case 'dashboard-section': loadDashboardStats(); break;
                 case 'games-section': loadGames(); break;
                 case 'promotions-section': loadPromotions(); break;
                 case 'tournaments-section': loadTournaments(); break;
                 case 'users-section': loadUsers(); break;
                 case 'withdrawals-section':
                    loadWithdrawals('pending'); loadWithdrawals('completed'); loadWithdrawals('rejected');
                    // Ensure correct tab is shown (if switching from another section)
                     const activeTabBtn = querySel('#withdrawalTabs .nav-link.active') || getElement('pending-tab');
                     if (activeTabBtn) getComponentInstance(activeTabBtn, 'Tab')?.show();
                    break;
                 case 'settings-section': loadSettings(); break;
                 case 'theme-section': loadThemeSettings(); break; // Load theme data
                 case 'notifications-section': loadNotificationsSection(); break;
                 case 'announcements-section': loadAnnList(); break;
                 case 'deposits-section': loadDeposits(); break;
                    case 'transactions-section':
                     if (elements.transactionsSection) elements.transactionsSection.innerHTML = '<h2 class="section-title"><i class="bi bi-receipt me-2"></i>User Transactions</h2><div class="card"><div class="card-body"><p class="text-muted mb-0"><i class="bi bi-tools me-2"></i>Transaction history section is under development.</p></div></div>';
                     break;
                 default: console.warn("Unknown section requested:", sectionId); showStatus(elements.dashboardStatus, `Unknown section requested: ${sectionId}`, "warning");
             }
         }

        // --- Firebase Auth Functions --- (No change needed)
        async function loginAdmin(event) { event.preventDefault(); if (!auth) return; const email = elements.adminEmailInput.value; const password = elements.adminPasswordInput.value; clearStatus(elements.adminLoginStatus); showLoader(true); try { await signInWithEmailAndPassword(auth, email, password); } catch (error) { console.error("Admin Login Error:", error); let message = `Login Failed: ${error.code}`; if (error.code === 'auth/network-request-failed') { message = "Login Failed: Network error."; } else if (['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found', 'auth/invalid-email'].includes(error.code)) { message = "Login Failed: Invalid email or password."; } else if (error.code === 'auth/too-many-requests') { message = "Login Failed: Too many attempts."; } showStatus(elements.adminLoginStatus, message, 'danger', false); } finally { showLoader(false); } }
        async function logoutAdminUser() { if (!auth) return; showLoader(true); try { await signOut(auth); } catch (error) { console.error("Admin Logout Error:", error); alert("Logout failed: " + error.message); } finally { /* Loader hidden by auth state change */ } }

        // --- Admin Setup & Verification --- (No change needed)
        async function checkAdminSetup() {
            // Setup removed — always return true (login directly)
            isAdminSetupComplete = true;
            return true;
        }

        async function setupAdmin(event) {
            // Setup removed
            if (event) event.preventDefault();
        }

        async function handleInitialLoad() {
            if (!auth) return;
            showLoader(true);
            // Always show login form directly — no setup needed
            elements.setupSection.style.display = 'none';
            elements.loginSection.style.display = 'block';
            elements.mainArea.style.display = 'none';
            elements.authContainer.style.display = 'block';
            showLoader(false);
        }

        async function handleAdminAuthStateChange(user) {
            if (!auth || !db) return;
            showLoader(true);
            currentAdminUser = user;
            detachAllAdminListeners();

            if (user) {
                // ✅ Any authenticated user can access admin — no UID check
                console.log('Admin Authenticated:', user.email);
                if (elements.adminUserEmailDisplay) elements.adminUserEmailDisplay.textContent = user.email;
                elements.authContainer.style.display = 'none';
                elements.mainArea.style.display = 'block';
                designatedAdminUid = user.uid;
                isAdminSetupComplete = true;
                // Auto-set isAdmin flag in DB so rules work correctly
                try {
                    const adminUserRef = ref(db, `users/${user.uid}`);
                    const snap = await get(adminUserRef);
                    if (snap.exists()) {
                        if (!snap.val().isAdmin) await update(adminUserRef, { isAdmin: true });
                    } else {
                        // Create admin user record if doesn't exist
                        await set(adminUserRef, {
                            uid: user.uid,
                            email: user.email,
                            displayName: 'Admin',
                            isAdmin: true,
                            balance: 0, winningCash: 0, bonusCash: 0,
                            totalMatches: 0, wonMatches: 0, totalEarnings: 0,
                            referralEarnings: 0, createdAt: Date.now()
                        });
                    }
                } catch(e) { console.warn("Could not set isAdmin flag:", e.message); }
                await loadSettings();
                showAdminSection('dashboard-section');
                setupRealtimeAdminListeners();
            } else {
                console.log('Auth State: Logged Out');
                currentAdminUser = null;
                designatedAdminUid = null;
                isAdminSetupComplete = false;
                elements.mainArea.style.display = 'none';
                elements.authContainer.style.display = 'block';
                gameDataCache = {}; userDataCache = {}; fullUserDataCache = {}; appSettings = {};
                if (elements.adminHeaderLogo) { elements.adminHeaderLogo.src = 'https://via.placeholder.com/35'; elements.adminHeaderLogo.style.display = 'none'; }
                if (elements.adminPageTitle) elements.adminPageTitle.textContent = 'Admin Panel';
                if (elements.adminUserEmailDisplay) elements.adminUserEmailDisplay.textContent = '';
                await handleInitialLoad();
            }
            setTimeout(() => showLoader(false), 150);
        }

        // --- Auth State Change Handler --- (No change needed)
        // handleAdminAuthStateChange defined above

        // --- Database Load Functions ---

        // *** MODIFIED: loadDashboardStats ***
        async function loadDashboardStats() {
            if (!db || !isDesignatedAdmin(currentAdminUser)) return;
            console.log("Loading dashboard stats...");
            clearStatus(elements.dashboardStatus);

            // Reset stats text
            Object.values(elements).filter(el => el.id?.startsWith('stat')).forEach(el => el.textContent = '...');

            const usersRef = ref(db, 'users');
            const gamesRef = ref(db, 'games');
            const promotionsRef = ref(db, 'promotions');
            const tournamentsRef = ref(db, 'tournaments');
            const withdrawalsRef = ref(db, 'withdrawals');

            // Queries (adjust as needed for performance, might fetch all withdrawals if indexed well)
            const activeTournamentsQuery = query(tournamentsRef, orderByChild('status')); // Filter client-side
            const pendingWithdrawalsQuery = query(withdrawalsRef, orderByChild('status'), equalTo('pending'));
            const completedWithdrawalsQuery = query(withdrawalsRef, orderByChild('status'), equalTo('completed'));
            const rejectedWithdrawalsQuery = query(withdrawalsRef, orderByChild('status'), equalTo('rejected'));

            const results = await Promise.allSettled([
                get(usersRef), get(gamesRef), get(promotionsRef),
                get(activeTournamentsQuery), get(pendingWithdrawalsQuery),
                get(completedWithdrawalsQuery), get(rejectedWithdrawalsQuery)
            ]);

            let errorsFound = false;
            const setError = (element) => { element.textContent = 'Error'; errorsFound = true; };

            // Process Users
            if (results[0].status === 'fulfilled') elements.statTotalUsers.textContent = results[0].value.exists() ? results[0].value.numChildren() : 0;
            else { console.error("Err Users:", results[0].reason); setError(elements.statTotalUsers); showStatus(elements.dashboardStatus, `Err Users: ${results[0].reason?.message}`, "warning"); }

            // Process Games
            if (results[1].status === 'fulfilled') elements.statTotalGames.textContent = results[1].value.exists() ? results[1].value.numChildren() : 0;
            else { console.error("Err Games:", results[1].reason); setError(elements.statTotalGames); }

            // Process Promotions
            if (results[2].status === 'fulfilled') elements.statTotalPromotions.textContent = results[2].value.exists() ? results[2].value.numChildren() : 0;
            else { console.error("Err Promos:", results[2].reason); setError(elements.statTotalPromotions); }

            // Process Tournaments (Active/Upcoming & Finished)
            if (results[3].status === 'fulfilled') {
                let activeCount = 0; let finishedCount = 0;
                if (results[3].value.exists()) {
                    results[3].value.forEach(child => {
                        const status = child.val()?.status;
                        if (status === 'ongoing' || status === 'upcoming') activeCount++;
                        else if (status === 'completed' || status === 'result' || status === 'cancelled') finishedCount++;
                    });
                }
                elements.statActiveTournaments.textContent = activeCount;
                elements.statFinishedTournaments.textContent = finishedCount;
            } else {
                console.error("Err Tournaments:", results[3].reason);
                setError(elements.statActiveTournaments); setError(elements.statFinishedTournaments);
                if (results[3].reason?.message?.includes("index")) showStatus(elements.dashboardStatus, "WARNING: Tournament query fail. Add '.indexOn': 'status' to '/tournaments' rules.", "warning", false);
                else showStatus(elements.dashboardStatus, `Err Tournaments: ${results[3].reason?.message}`, "warning");
            }

            // Process Pending Withdrawals
            if (results[4].status === 'fulfilled') {
                const count = results[4].value.exists() ? results[4].value.numChildren() : 0;
                elements.statPendingWithdrawals.textContent = count;
                elements.pendingWithdrawalCountBadge.textContent = count;
                elements.pendingWithdrawalCountBadge.style.display = count > 0 ? 'inline-block' : 'none';
            } else {
                console.error("Err Pending Withdrawals:", results[4].reason);
                setError(elements.statPendingWithdrawals); elements.pendingWithdrawalCountBadge.textContent = 'Err'; elements.pendingWithdrawalCountBadge.style.display = 'inline-block';
                if (results[4].reason?.message?.includes("index")) showStatus(elements.dashboardStatus, "CRITICAL: Pending withdrawal query fail. Add '.indexOn': 'status' to '/withdrawals' rules.", "danger", false);
                else showStatus(elements.dashboardStatus, `Err Pending Withdrawals: ${results[4].reason?.message}`, "warning");
            }

             // Process Completed Withdrawals
            if (results[5].status === 'fulfilled') elements.statCompletedWithdrawals.textContent = results[5].value.exists() ? results[5].value.numChildren() : 0;
            else { console.error("Err Completed Withdrawals:", results[5].reason); setError(elements.statCompletedWithdrawals); if (results[5].reason?.message?.includes("index")) showStatus(elements.dashboardStatus, "WARNING: Completed withdrawal query fail. Add '.indexOn': 'status' to '/withdrawals' rules.", "warning", false); }

             // Process Rejected Withdrawals
            if (results[6].status === 'fulfilled') elements.statRejectedWithdrawals.textContent = results[6].value.exists() ? results[6].value.numChildren() : 0;
            else { console.error("Err Rejected Withdrawals:", results[6].reason); setError(elements.statRejectedWithdrawals); if (results[6].reason?.message?.includes("index")) showStatus(elements.dashboardStatus, "WARNING: Rejected withdrawal query fail. Add '.indexOn': 'status' to '/withdrawals' rules.", "warning", false); }


            console.log("Dashboard stats loading complete.", errorsFound ? "Errors occurred." : "");
        }

        // *** MODIFIED: loadGames (adds Edit Button) ***
        async function loadGames() {
             if (!db || !isDesignatedAdmin(currentAdminUser)) return;
             const gamesRef = ref(db, 'games');
             elements.gamesTableBody.innerHTML = tableLoadingPlaceholderHtml(4);
             gameDataCache = {}; // Reset cache
             clearStatus(elements.gamesStatus);

             try {
                 const snapshot = await get(gamesRef);
                 let tableHtml = '';
                 if (snapshot.exists()) {
                     snapshot.forEach(childSnapshot => {
                         const gameId = childSnapshot.key;
                         const game = childSnapshot.val();
                         if (game && game.name) {
                            gameDataCache[gameId] = game.name; // Populate cache
                            tableHtml += `
                                <tr>
                                    <td><img src="${sanitizeHTML(game.imageUrl || 'https://via.placeholder.com/60x40/1E293B/94A3B8?text=N/A')}" alt="${sanitizeHTML(game.name)}" class="preview-img"></td>
                                    <td>${sanitizeHTML(game.name)}</td>
                                    <td><small class="text-muted">${sanitizeHTML(gameId)}</small> <i class="bi bi-clipboard copy-btn ms-1" data-target="td:nth-child(3) > small" title="Copy Game ID"></i></td>
                                    <td class="action-buttons">
                                        <button class="btn btn-sm btn-info btn-edit-game" data-id="${sanitizeHTML(gameId)}" title="Edit Game"><i class="bi bi-pencil-square"></i></button>
                                        <button class="btn btn-sm btn-danger btn-delete-game" data-id="${sanitizeHTML(gameId)}" title="Delete Game"><i class="bi bi-trash"></i></button>
                                    </td>
                                </tr>`;
                         } else { console.warn("Skipping invalid game data:", gameId, game); }
                     });
                 }
                 elements.gamesTableBody.innerHTML = tableHtml || `<tr><td colspan="4" class="text-center p-3 text-muted">No games found. Add one using the button above.</td></tr>`;
                 // Update dashboard count if visible
                 if (elements.dashboardSection?.classList.contains('active')) {
                     elements.statTotalGames.textContent = Object.keys(gameDataCache).length;
                 }

             } catch (error) {
                 console.error("Error loading games:", error);
                 elements.gamesTableBody.innerHTML = `<tr><td colspan="4" class="text-center p-3 text-danger">Error loading games: ${error.message}. Check console & Rules.</td></tr>`;
                 showStatus(elements.gamesStatus, `Error loading games: ${error.message}. Check Rules.`, 'danger', false);
                 if (elements.dashboardSection?.classList.contains('active')) elements.statTotalGames.textContent = 'Error';
             }
         }

        // *** MODIFIED: loadPromotions (adds Edit Button) ***
        async function loadPromotions() {
             if (!db || !isDesignatedAdmin(currentAdminUser)) return;
             const promotionsRef = ref(db, 'promotions');
             elements.promotionsTableBody.innerHTML = tableLoadingPlaceholderHtml(3);
             clearStatus(elements.promotionsStatus);
             let promoCount = 0;
             try {
                 const snapshot = await get(promotionsRef);
                 let tableHtml = '';
                 if (snapshot.exists()) {
                    promoCount = snapshot.numChildren();
                     snapshot.forEach(childSnapshot => {
                         const promoId = childSnapshot.key;
                         const promo = childSnapshot.val();
                          if (promo && promo.imageUrl) {
                            const displayLink = promo.link ? sanitizeHTML(promo.link) : '';
                            const shortLink = displayLink.length > 50 ? displayLink.substring(0, 50) + '...' : displayLink;
                            tableHtml += `
                                <tr>
                                    <td><img src="${sanitizeHTML(promo.imageUrl)}" alt="Promotion" class="preview-img"></td>
                                    <td>${promo.link ? `<a href="${displayLink}" target="_blank" class="text-info" title="${displayLink}">${shortLink}</a>` : '<span class="text-muted">No Link</span>'}</td>
                                    <td class="action-buttons">
                                        <button class="btn btn-sm btn-info btn-edit-promo" data-id="${sanitizeHTML(promoId)}" title="Edit Promotion"><i class="bi bi-pencil-square"></i></button>
                                        <button class="btn btn-sm btn-danger btn-delete-promo" data-id="${sanitizeHTML(promoId)}" title="Delete Promotion"><i class="bi bi-trash"></i></button>
                                    </td>
                                </tr>`;
                          } else { console.warn("Skipping invalid promotion data:", promoId, promo); }
                     });
                 }
                 elements.promotionsTableBody.innerHTML = tableHtml || `<tr><td colspan="3" class="text-center p-3 text-muted">No promotions found.</td></tr>`;
                 // Update dashboard count if visible
                 if (elements.dashboardSection?.classList.contains('active')) {
                     elements.statTotalPromotions.textContent = promoCount;
                 }

             } catch (error) {
                 console.error("Error loading promotions:", error);
                 elements.promotionsTableBody.innerHTML = `<tr><td colspan="3" class="text-center p-3 text-danger">Error loading promotions: ${error.message}. Check console & Rules.</td></tr>`;
                  showStatus(elements.promotionsStatus, `Error loading promotions: ${error.message}. Check Rules.`, 'danger', false);
                  if (elements.dashboardSection?.classList.contains('active')) elements.statTotalPromotions.textContent = 'Error';
             }
         }

        // *** MODIFIED: loadTournaments (adds player count column) ***
        async function loadTournaments() {
             if (!db || !isDesignatedAdmin(currentAdminUser)) return;
             const tournamentsRef = ref(db, 'tournaments');
             if (Object.keys(gameDataCache).length === 0) await loadGames(); // Ensure games loaded

             elements.tournamentsTableBody.innerHTML = tableLoadingPlaceholderHtml(8); // Increased colspan
             clearStatus(elements.tournamentsStatus);

             try {
                 const snapshot = await get(tournamentsRef);
                 let activeCount = 0; let finishedCount = 0;
                 let tableHtml = '';
                 if (snapshot.exists()) {
                     snapshot.forEach(childSnapshot => {
                         const tournamentId = childSnapshot.key;
                         const t = childSnapshot.val();
                         if (t && t.name && t.gameId && t.status) {
                             const gameName = gameDataCache[t.gameId] || `<small class="text-warning" title="ID: ${t.gameId}">Unknown</small>`;
                             let statusClass = 'secondary';
                             if (t.status === 'ongoing') { statusClass = 'success'; activeCount++; }
                             else if (t.status === 'upcoming') { statusClass = 'info'; activeCount++; }
                             else if (t.status === 'result') { statusClass = 'primary'; finishedCount++; }
                             else if (t.status === 'completed') { statusClass = 'secondary'; finishedCount++; }
                             else if (t.status === 'cancelled') { statusClass = 'danger'; finishedCount++; }

                             const statusBadge = `<span class="status-badge text-bg-${statusClass}">${t.status}</span>`;
                             const registeredCount = t.registeredPlayers ? Object.keys(t.registeredPlayers).length : 0;
                             const maxPlayers = t.maxPlayers > 0 ? `/${t.maxPlayers}` : '';
                             const playersDisplay = `${registeredCount}${maxPlayers}`;

                             tableHtml += `
                                 <tr>
                                     <td>${sanitizeHTML(t.name)}</td>
                                     <td>${gameName}</td>
                                     <td>${formatCurrency(t.entryFee)}</td>
                                     <td>${formatCurrency(t.prizePool)}</td>
                                     <td>${formatDate(t.startTime)}</td>
                                     <td>${statusBadge}</td>
                                     <td>${playersDisplay}</td>
                                     <td class="action-buttons">
                                         <button class="btn btn-sm btn-info btn-edit-tournament" data-id="${sanitizeHTML(tournamentId)}" title="Edit"><i class="bi bi-pencil-square"></i></button>
                                         <button class="btn btn-sm btn-secondary btn-view-registered" data-id="${sanitizeHTML(tournamentId)}" data-name="${sanitizeHTML(t.name)}" title="View Players"><i class="bi bi-people"></i></button>
                                         <button class="btn btn-sm btn-danger btn-delete-tournament" data-id="${sanitizeHTML(tournamentId)}" title="Delete"><i class="bi bi-trash"></i></button>
                                     </td>
                                 </tr>`;
                         } else { console.warn("Skipping invalid tournament data:", tournamentId, t); }
                     });
                 }
                 elements.tournamentsTableBody.innerHTML = tableHtml || `<tr><td colspan="8" class="text-center p-3 text-muted">No tournaments found.</td></tr>`;

                 // Update dashboard counts if visible
                 if (elements.dashboardSection?.classList.contains('active')) {
                     elements.statActiveTournaments.textContent = activeCount;
                     elements.statFinishedTournaments.textContent = finishedCount;
                 }

             } catch (error) {
                 console.error("Error loading tournaments:", error);
                 elements.tournamentsTableBody.innerHTML = `<tr><td colspan="8" class="text-center p-3 text-danger">Error: ${error.message}. Check Rules.</td></tr>`;
                 showStatus(elements.tournamentsStatus, `Error loading tournaments: ${error.message}. Check Rules.`, 'danger', false);
                 if (elements.dashboardSection?.classList.contains('active')) {
                     elements.statActiveTournaments.textContent = 'Error';
                     elements.statFinishedTournaments.textContent = 'Error';
                 }
             }
         }

        // Helper function to render the users table
        function renderUsersTable(usersArray) {
            let tableHtml = '';
            if (usersArray?.length > 0) {
                // Sort alphabetically by display name, case-insensitive
                usersArray.sort((a, b) => (a.displayName || '').localeCompare(b.displayName || '', undefined, { sensitivity: 'base' }));
                usersArray.forEach(user => {
                    if (user?.email && user.uid) {
                        const status = user.status || 'active';
                        const statusBadge = `<span class="status-badge text-bg-${status === 'active' ? 'success' : 'danger'}">${status}</span>`;
                        tableHtml += `
                            <tr>
                                <td><small class="text-muted">${sanitizeHTML(user.uid)}</small> <i class="bi bi-clipboard copy-btn ms-1" data-target="td:first-child > small" title="Copy UID"></i></td>
                                <td>${sanitizeHTML(user.displayName || 'N/A')}</td>
                                <td>${sanitizeHTML(user.email)}</td>
                                <td>${formatCurrency(user.balance)}</td>
                                <td>${statusBadge}</td>
                                <td class="action-buttons">
                                    <button class="btn btn-sm btn-info btn-view-user" data-id="${sanitizeHTML(user.uid)}" title="View/Edit"><i class="bi bi-eye"></i></button>
                                    <button class="btn btn-sm btn-danger btn-delete-user" data-id="${sanitizeHTML(user.uid)}" title="Delete (DB Only)"><i class="bi bi-trash"></i></button>
                                </td>
                            </tr>`;
                    }
                });
            }
            elements.usersTableBody.innerHTML = tableHtml || `<tr><td colspan="6" class="text-center p-3 text-muted">No users found matching criteria.</td></tr>`;
        }

        async function loadUsers() {
            if (!db || !isDesignatedAdmin(currentAdminUser)) return;
            const usersRef = ref(db, 'users');
            elements.usersTableBody.innerHTML = tableLoadingPlaceholderHtml(6);
            userDataCache = {}; fullUserDataCache = {}; // Reset caches
            clearStatus(elements.usersStatus);
            elements.userSearchInput.value = ''; // Clear search

            const listenerKey = 'users';
            if (dbListeners[listenerKey]) try { off(usersRef, 'value', dbListeners[listenerKey]); delete dbListeners[listenerKey]; console.log("Detached previous users listener."); } catch(e) { console.warn("Could not detach users listener", e); }

            dbListeners[listenerKey] = onValue(usersRef, (snapshot) => {
                 console.log("Users data received via listener.");
                 let userCount = 0; const usersArray = [];
                 fullUserDataCache = {}; userDataCache = {}; // Rebuild caches

                 if (snapshot.exists()) {
                     snapshot.forEach(childSnapshot => {
                         userCount++;
                         const userId = childSnapshot.key;
                         const user = childSnapshot.val();
                         if (user && user.email) {
                            user.uid = userId;
                            fullUserDataCache[userId] = user;
                            userDataCache[userId] = { displayName: user.displayName || 'N/A', email: user.email, status: user.status || 'active', balance: user.balance || 0, winningCash: user.winningCash || 0 };
                            usersArray.push(user);
                         } else { console.warn("Skipping invalid user data:", userId, user); }
                     });
                 }

                 renderUsersTable(usersArray); // Render initially

                 if (elements.dashboardSection?.classList.contains('active')) {
                     elements.statTotalUsers.textContent = userCount;
                 }
                 console.log("Users table updated. Count:", userCount);

            }, (error) => {
                 console.error("Error listening to users:", error);
                 elements.usersTableBody.innerHTML = `<tr><td colspan="6" class="text-center p-3 text-danger">Error: ${error.message}. Check Rules.</td></tr>`;
                 showStatus(elements.usersStatus, `Error listening to users: ${error.message}. Check Rules.`, 'danger', false);
                 fullUserDataCache = {}; userDataCache = {};
                 if (elements.dashboardSection?.classList.contains('active')) elements.statTotalUsers.textContent = 'Error';
                 try { if (dbListeners[listenerKey]) { off(usersRef, 'value', dbListeners[listenerKey]); delete dbListeners[listenerKey]; console.log("Detached failed users listener."); } } catch(e) { console.warn("Could not detach failed users listener.", e); }
            });
             console.log("Attached new users listener.");
        }

        async function loadWithdrawals(status = 'pending') {
             if (!db || !isDesignatedAdmin(currentAdminUser)) return;
             const targetTableBody = getElement(`${status}WithdrawalsTableBody`);
             if (!targetTableBody) { console.error(`Table body not found: ${status}`); return; }
             const q = query(ref(db, 'withdrawals'), orderByChild('status'), equalTo(status));
             targetTableBody.innerHTML = tableLoadingPlaceholderHtml(status === 'pending' ? 5 : 6);
             if (status === 'pending') clearStatus(elements.withdrawalsStatus);

             const listenerKey = `withdrawals-${status}`;
             if (dbListeners[listenerKey]) try { off(q, 'value', dbListeners[listenerKey]); delete dbListeners[listenerKey]; console.log(`Detached previous ${status} withdrawals listener.`); } catch (e) { console.warn(`Could not detach ${listenerKey}`, e); }

             dbListeners[listenerKey] = onValue(q, async (snapshot) => {
                 console.log(`${status} withdrawals data received.`);
                 let tableHtml = ''; let count = 0;
                 targetTableBody.innerHTML = '';

                 if (snapshot.exists()) {
                     count = snapshot.numChildren();
                     const userIds = new Set();
                     snapshot.forEach(child => { if (child.val()?.userId && !userDataCache[child.val().userId]) userIds.add(child.val().userId); });

                     if (userIds.size > 0) {
                         console.log(`Fetching ${userIds.size} missing basic user details for ${status} withdrawals...`);
                         const promises = Array.from(userIds).map(uid =>
                             get(ref(db, `users/${uid}`)).then(us => {
                                 if (us.exists()) { const u = us.val(); userDataCache[uid] = { displayName: u.displayName || 'N/A', email: u.email || uid, status: u.status || 'unknown' }; }
                                 else { userDataCache[uid] = { displayName: 'Unknown User', email: uid, status: 'deleted' }; }
                             }).catch(err => { console.warn(`Failed fetch user ${uid}`, err); userDataCache[uid] = { displayName: 'Error Fetching', email: uid, status: 'error' }; })
                         );
                         await Promise.allSettled(promises);
                         console.log("Missing user details fetch complete.");
                     }

                     // Sort by requestTimestamp descending
                     const withdrawals = [];
                     snapshot.forEach(child => withdrawals.push({ id: child.key, ...child.val() }));
                     withdrawals.sort((a, b) => (b.requestTimestamp || 0) - (a.requestTimestamp || 0));

                     withdrawals.forEach(w => {
                          if (w && w.userId && w.amount != null && w.requestTimestamp) {
                              const user = userDataCache[w.userId] || { displayName: 'Loading...', email: w.userId, status: 'unknown' };
                              const userDisplay = `${sanitizeHTML(user.displayName)} (<small class="text-muted" title="${w.userId}">${sanitizeHTML(user.email)}</small>)`;
                              let methodDisplay = sanitizeHTML(w.methodDetails?.methodName || w.method || 'N/A');
                              if (w.methodDetails?.accountInfo) { methodDisplay += `<small class="text-muted d-block" title="${sanitizeHTML(w.methodDetails.accountInfo)}">${sanitizeHTML(String(w.methodDetails.accountInfo)).substring(0, 40)}${String(w.methodDetails.accountInfo).length > 40 ? '...' : ''}</small>`; }
                              const requestTime = formatDate(w.requestTimestamp);
                              const processedTime = formatDate(w.processedAt);

                              let rowHtml = `<tr><td>${requestTime}</td>`;
                              if (status !== 'pending') rowHtml += `<td>${processedTime}</td>`;
                              rowHtml += `<td>${userDisplay}</td><td>${formatCurrency(w.amount)}</td><td>${methodDisplay}</td>`;

                              if (status === 'pending') {
                                  rowHtml += `<td class="action-buttons"><button class="btn btn-sm btn-success btn-approve-withdrawal" data-id="${sanitizeHTML(w.id)}" data-userid="${sanitizeHTML(w.userId)}" title="Approve"><i class="bi bi-check-circle"></i></button> <button class="btn btn-sm btn-danger btn-reject-withdrawal" data-id="${sanitizeHTML(w.id)}" data-userid="${sanitizeHTML(w.userId)}" title="Reject"><i class="bi bi-x-circle"></i></button></td>`;
                              } else if (status === 'completed') { const note = sanitizeHTML(w.adminNote || ''); rowHtml += `<td><small title="${note}">${note.substring(0, 30)}${ note.length > 30 ? '...' : ''}</small></td>`; }
                              else if (status === 'rejected') { const reason = sanitizeHTML(w.rejectReason || ''); rowHtml += `<td><small title="${reason}">${reason.substring(0, 30)}${ reason.length > 30 ? '...' : ''}</small></td>`; }
                              rowHtml += `</tr>`;
                              tableHtml += rowHtml;
                          } else { console.warn(`Skipping invalid ${status} withdrawal:`, w.id, w); }
                     });
                 }
                 const emptyColspan = status === 'pending' ? 5 : 6;
                 targetTableBody.innerHTML = tableHtml || `<tr><td colspan="${emptyColspan}" class="text-center p-3 text-muted">No ${status} withdrawals found.</td></tr>`;

                  if (status === 'pending') {
                      if (elements.pendingWithdrawalCountBadge) { elements.pendingWithdrawalCountBadge.textContent = count; elements.pendingWithdrawalCountBadge.style.display = count > 0 ? 'inline-block' : 'none'; }
                      if (elements.dashboardSection?.classList.contains('active') && elements.statPendingWithdrawals) elements.statPendingWithdrawals.textContent = count;
                  } else if (status === 'completed' && elements.dashboardSection?.classList.contains('active') && elements.statCompletedWithdrawals) {
                      elements.statCompletedWithdrawals.textContent = count;
                  } else if (status === 'rejected' && elements.dashboardSection?.classList.contains('active') && elements.statRejectedWithdrawals) {
                      elements.statRejectedWithdrawals.textContent = count;
                  }
                  console.log(`${status} withdrawals table updated. Count:`, count);

             }, (error) => {
                 console.error(`Error listening to ${status} withdrawals:`, error);
                 const errorColspan = status === 'pending' ? 5 : 6;
                 targetTableBody.innerHTML = `<tr><td colspan="${errorColspan}" class="text-center p-3 text-danger">Error loading: ${error.message}. Check Rules/Index.</td></tr>`;
                 showStatus(elements.withdrawalsStatus, `Error loading ${status} withdrawals: ${error.message}. Check Rules/Index.`, 'danger', false);
                 if (status === 'pending') { if (error?.message?.includes("index")) showStatus(elements.withdrawalsStatus, "CRITICAL: Pending query fail. Add '.indexOn': 'status' to '/withdrawals' rules.", "danger", false); if(elements.pendingWithdrawalCountBadge){ elements.pendingWithdrawalCountBadge.textContent = 'Err'; elements.pendingWithdrawalCountBadge.style.display = 'inline-block';} if (elements.dashboardSection?.classList.contains('active')) elements.statPendingWithdrawals.textContent = 'Error'; }
                 else if (status === 'completed' && elements.dashboardSection?.classList.contains('active')) elements.statCompletedWithdrawals.textContent = 'Error';
                 else if (status === 'rejected' && elements.dashboardSection?.classList.contains('active')) elements.statRejectedWithdrawals.textContent = 'Error';
                 try { if (dbListeners[listenerKey]) { off(q, 'value', dbListeners[listenerKey]); delete dbListeners[listenerKey]; console.log(`Detached failed ${status} listener.`); } } catch(e) { console.warn(`Could not detach failed ${status} listener.`, e); }
             });
              console.log(`Attached new listener for ${status} withdrawals.`);
         }

        async function loadSettings() {
             if (!db || !isDesignatedAdmin(currentAdminUser)) return;
             console.log("Loading settings...");
             elements.appSettingsForm?.querySelectorAll('input, textarea, button').forEach(el => el.disabled = true);
             clearStatus(elements.settingsStatus);
             try {
                 const snapshot = await get(ref(db, 'settings'));
                 if (snapshot.exists()) {
                     appSettings = snapshot.val() || {};
                     elements.settingLogoUrlInput.value = appSettings.logoUrl || '';
                     elements.settingAppNameInput.value = appSettings.appName || '';
                     elements.settingMinWithdrawInput.value = appSettings.minWithdraw || 0;
                     elements.settingReferralBonusInput.value = appSettings.referralBonus || 0;
                     elements.settingSignupBonusInput.value = appSettings.signupBonus || 0;
                     elements.settingSupportContactInput.value = appSettings.supportContact || '';
                     elements.settingUpiDetailsInput.value = appSettings.upiDetails || '';
                     elements.settingPolicyPrivacyInput.value = appSettings.policyPrivacy || '';
                     elements.settingPolicyTermsInput.value = appSettings.policyTerms || '';
                     elements.settingPolicyRefundInput.value = appSettings.policyRefund || '';
                     elements.settingPolicyFairPlayInput.value = appSettings.policyFairPlay || '';
                     if (elements.settingImgbbApiKey) elements.settingImgbbApiKey.value = appSettings.imgbbApiKey || '';
                     // Payment Settings load
                     const pm = appSettings.paymentMethod || 'manual';
                     if (elements.pmManualRadio) elements.pmManualRadio.checked = (pm === 'manual');
                     if (elements.pmGatewayRadio) elements.pmGatewayRadio.checked = (pm === 'gateway');
                     if (elements.manualPaymentFields) elements.manualPaymentFields.style.display = (pm === 'manual') ? 'block' : 'none';
                     if (elements.gatewayPaymentFields) elements.gatewayPaymentFields.style.display = (pm === 'gateway') ? 'block' : 'none';
                     if (elements.settingPayUpiId) elements.settingPayUpiId.value = appSettings.payUpiId || '';
                     if (elements.settingPayQrUrl) elements.settingPayQrUrl.value = appSettings.payQrUrl || '';
                     if (elements.settingPayInstructions) elements.settingPayInstructions.value = appSettings.payInstructions || '';
                     if (elements.settingZapupiUrl) elements.settingZapupiUrl.value = appSettings.zapupiUrl || '';
                     if (elements.settingZapupiKey) elements.settingZapupiKey.value = appSettings.zapupikey || '';
                     if (appSettings.payQrUrl && elements.qrPreviewDiv) {
                         elements.qrPreviewImg.src = appSettings.payQrUrl;
                         elements.qrPreviewDiv.style.display = 'block';
                     }
                     if(elements.adminHeaderLogo) { const logoUrl = appSettings.logoUrl; elements.adminHeaderLogo.src = logoUrl || 'https://via.placeholder.com/35/1E293B/94A3B8?text=L'; elements.adminHeaderLogo.style.display = logoUrl ? 'inline-block' : 'none'; elements.adminHeaderLogo.alt = appSettings.appName ? `${appSettings.appName} Logo` : 'Logo'; }
                     document.title = `${appSettings.appName || 'Gaming Tournament'} - Admin Panel`;
                     console.log("Settings loaded and applied.");
                 } else {
                     console.log("No settings found.");
                     showStatus(elements.settingsStatus, "No settings found. Please configure.", "info", false);
                     elements.appSettingsForm.reset(); appSettings = {};
                     if(elements.adminHeaderLogo) elements.adminHeaderLogo.style.display = 'none'; document.title = 'Admin Panel';
                 }
             } catch (error) {
                 console.error("Error loading settings:", error);
                 showStatus(elements.settingsStatus, `Error loading settings: ${error.message}. Check Rules.`, "danger", false);
                 appSettings = {}; if(elements.adminHeaderLogo) elements.adminHeaderLogo.style.display = 'none'; document.title = 'Admin Panel';
             } finally {
                 elements.appSettingsForm?.querySelectorAll('input, textarea, button').forEach(el => el.disabled = false);
             }
         }

        // --- ImgBB Upload Function (uses dynamic API key from settings) ---
        function getImgbbKey() {
            return appSettings.imgbbApiKey || '1579b196953465c653d3639ab091448c';
        }
        async function uploadToImgBB(file, statusElement) { if (!file) throw new Error("File not selected."); const apiKey = getImgbbKey(); if (!apiKey) { throw new Error("ImgBB API Key not set. Please add it in Settings."); } const formData = new FormData(); formData.append('image', file); if (statusElement) { statusElement.textContent = 'Uploading to ImgBB...'; statusElement.style.color = 'var(--text-secondary)'; statusElement.style.display = 'block'; } try { const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: 'POST', body: formData }); if (!response.ok) { let errorMsg = `ImgBB upload failed: HTTP ${response.status}`; try { const errorData = await response.json(); errorMsg += ` - ${errorData?.error?.message || response.statusText}`; } catch (e) {} throw new Error(errorMsg); } const data = await response.json(); if (data.success) { console.log('ImgBB upload successful. URL:', data.data.url); if (statusElement) { statusElement.textContent = '✓ Upload complete!'; statusElement.style.color = 'var(--success-color)'; } return data.data.url; } else { throw new Error(`ImgBB upload failed: ${data.error?.message || 'Unknown error'}`); } } catch (error) { console.error('ImgBB Fetch error:', error); if (statusElement) { statusElement.textContent = `Upload Error: ${error.message}`; statusElement.style.color = 'var(--danger-color)'; statusElement.style.display = 'block'; } throw error; } }

        // --- Database Save/Update/Delete Functions ---

        // *** MODIFIED: saveGame (Handles Add & Edit) ***
        async function saveGame() {
            if (!db || !isDesignatedAdmin(currentAdminUser)) return;
            const gameId = elements.gameEditId.value; // Check if editing
            const isEditing = !!gameId;
            const name = elements.gameNameInput.value.trim();
            const imageUrlInput = elements.gameImageUrlInput.value.trim();
            const imageFile = elements.gameImageFileInput.files[0];

            const statusEl = elements.gameStatus; // Status inside modal
            const imgbbStatusEl = elements.gameForm?.querySelector('.imgbb-upload-status');
            clearStatus(statusEl);
            if (imgbbStatusEl) { imgbbStatusEl.textContent = ''; imgbbStatusEl.style.display = 'none'; }

            if (!name) { showStatus(statusEl, "Game Name is required.", "warning"); return; }
            // Require URL unless a new file is being uploaded
            if (!imageUrlInput && !imageFile && !isEditing) { // Must provide URL or file for new game
                 showStatus(statusEl, "Image URL or File Upload required for new game.", "warning"); return;
            }
             if (!imageUrlInput && !imageFile && isEditing) { // Must have URL if editing and not uploading new file
                 showStatus(statusEl, "Image URL cannot be empty when editing.", "warning"); return;
             }

            showLoader(true);
            elements.saveGameBtn.disabled = true;
            let finalImageUrl = imageUrlInput; // Start with the input URL

            try {
                // Upload to ImgBB ONLY if a new file is selected
                if (imageFile) {
                    finalImageUrl = await uploadToImgBB(imageFile, imgbbStatusEl);
                }

                if (!finalImageUrl) {
                     throw new Error("Image URL is missing after potential upload.");
                }

                const gameData = { name: name, imageUrl: finalImageUrl };

                if (isEditing) {
                    gameData.updatedAt = serverTimestamp();
                    const gameRef = ref(db, `games/${gameId}`);
                    await update(gameRef, gameData);
                    console.log("Game updated successfully:", gameId);
                    showStatus(elements.gamesStatus, "Game updated successfully!", "success", 3000); // Show status in main section
                } else {
                    gameData.createdAt = serverTimestamp();
                    const newGameRef = push(ref(db, 'games'));
                    await set(newGameRef, gameData);
                    console.log("Game added successfully, key:", newGameRef.key);
                    showStatus(elements.gamesStatus, "Game added successfully!", "success", 3000); // Show status in main section
                }

                elements.gameForm.reset();
                elements.gameEditId.value = ''; // Clear edit ID
                if (imgbbStatusEl) { imgbbStatusEl.textContent = ''; imgbbStatusEl.style.display = 'none'; }
                getModalInstance(elements.gameModalEl)?.hide();
                loadGames(); // Refresh list

            } catch (error) {
                console.error("Error saving game:", error);
                showStatus(statusEl, `Error saving game: ${error.message}. Check console & Rules.`, "danger", false); // Show error in modal
                 if (imgbbStatusEl && !imgbbStatusEl.textContent.includes('Error')) {
                      imgbbStatusEl.style.display = 'none';
                 }
            } finally {
                showLoader(false);
                elements.saveGameBtn.disabled = false;
            }
        }

        // *** MODIFIED: savePromotion (Handles Add & Edit) ***
        async function savePromotion() {
             if (!db || !isDesignatedAdmin(currentAdminUser)) return;
             const promoId = elements.promotionEditId.value;
             const isEditing = !!promoId;
             const promoLink = elements.promoLinkInput.value.trim();
             const imageUrlInput = elements.promoImageUrlInput.value.trim();
             const imageFile = elements.promoImageFileInput.files[0];

             const statusEl = elements.promotionStatus; // Status inside modal
             const imgbbStatusEl = elements.promotionForm?.querySelector('.imgbb-upload-status');
             clearStatus(statusEl);
             if (imgbbStatusEl) { imgbbStatusEl.textContent = ''; imgbbStatusEl.style.display = 'none'; }

             if (!imageUrlInput && !imageFile && !isEditing) {
                 showStatus(statusEl, "Image URL or File Upload required for new promotion.", "warning"); return;
             }
             if (!imageUrlInput && !imageFile && isEditing) {
                 showStatus(statusEl, "Image URL cannot be empty when editing.", "warning"); return;
             }

             showLoader(true);
             elements.savePromotionBtn.disabled = true;
             let finalImageUrl = imageUrlInput;

             try {
                 if (imageFile) {
                     finalImageUrl = await uploadToImgBB(imageFile, imgbbStatusEl);
                 }

                 if (!finalImageUrl) {
                     throw new Error("Image URL is missing after potential upload.");
                 }

                 const promoData = { imageUrl: finalImageUrl, link: promoLink || null };

                 if (isEditing) {
                    promoData.updatedAt = serverTimestamp();
                    const promoRef = ref(db, `promotions/${promoId}`);
                    await update(promoRef, promoData);
                    console.log("Promotion updated successfully:", promoId);
                    showStatus(elements.promotionsStatus, "Promotion updated successfully!", "success", 3000); // Show status in section
                 } else {
                    promoData.createdAt = serverTimestamp();
                    const newPromoRef = push(ref(db, 'promotions'));
                    await set(newPromoRef, promoData);
                    console.log("Promotion added successfully, key:", newPromoRef.key);
                    showStatus(elements.promotionsStatus, "Promotion added successfully!", "success", 3000); // Show status in section
                 }

                 elements.promotionForm.reset();
                 elements.promotionEditId.value = ''; // Clear edit ID
                 if (imgbbStatusEl) { imgbbStatusEl.textContent = ''; imgbbStatusEl.style.display = 'none'; }
                 getModalInstance(elements.promotionModalEl)?.hide();
                 loadPromotions(); // Refresh list

             } catch (error) {
                 console.error("Error saving promotion:", error);
                 showStatus(statusEl, `Error saving promotion: ${error.message}. Check console & Rules.`, "danger", false); // Show error in modal
                  if (imgbbStatusEl && !imgbbStatusEl.textContent.includes('Error')) {
                      imgbbStatusEl.style.display = 'none';
                 }
             } finally {
                 showLoader(false);
                 elements.savePromotionBtn.disabled = false;
             }
         }

        // Save Tournament - with banner image upload support
        async function saveTournament(event) {
            if (event) event.preventDefault();
            if (!db || !isDesignatedAdmin(currentAdminUser)) return;
            const statusEl = elements.addTournamentStatus;
            clearStatus(statusEl);
            const gameId = elements.tournamentGameSelect.value;
            const name = elements.tournamentNameInput.value.trim();
            const startTimeStr = elements.tournamentStartTimeInput.value;
            const entryFeeStr = elements.tournamentEntryFeeInput.value;
            const prizePoolStr = elements.tournamentPrizePoolInput.value;
            const perKillStr = elements.tournamentPerKillInput.value;
            const maxPlayersStr = elements.tournamentMaxPlayersInput.value;
            if (!gameId || !name || !startTimeStr) { showStatus(statusEl, "Game, Name, and Start Time required.", "warning"); return; }
            let startTimeTimestamp;
            try { startTimeTimestamp = new Date(startTimeStr).getTime(); if (isNaN(startTimeTimestamp)) throw new Error('Invalid Date'); } catch (e) { showStatus(statusEl, "Invalid Start Date & Time.", "warning"); return; }
            const entryFee = parseFloat(entryFeeStr) || 0;
            const prizePool = parseFloat(prizePoolStr) || 0;
            const perKillPrize = parseFloat(perKillStr) || 0;
            const maxPlayers = parseInt(maxPlayersStr) || 0;
            if (entryFee < 0 || prizePool < 0 || perKillPrize < 0 || maxPlayers < 0) { showStatus(statusEl, "Numeric values cannot be negative.", "warning"); return; }

            showLoader(true);
            elements.saveTournamentBtn.disabled = true;

            let finalBannerUrl = elements.tournamentBannerUrlInput?.value?.trim() || null;
            const bannerFile = elements.tournamentBannerFile?.files[0];
            const bannerImgbbStatus = elements.tournamentBannerImgbbStatus;

            try {
                // Upload banner image if file selected
                if (bannerFile) {
                    finalBannerUrl = await uploadToImgBB(bannerFile, bannerImgbbStatus);
                }

                const tournamentData = { gameId, name, startTime: startTimeTimestamp, status: elements.tournamentStatusSelect.value, entryFee, prizePool, perKillPrize, maxPlayers, tags: elements.tournamentTagsInput.value.split(',').map(t => t.trim()).filter(t => t), map: elements.tournamentMapInput?.value?.trim() || null, mode: elements.tournamentModeInput?.value?.trim() || null, description: elements.tournamentDescriptionInput.value.trim(), roomId: elements.tournamentRoomIdInput.value.trim() || null, roomPassword: elements.tournamentRoomPasswordInput.value.trim() || null, showIdPass: elements.tournamentShowIdPassCheckbox.checked, bannerUrl: finalBannerUrl, updatedAt: serverTimestamp() };

                if (currentEditingTournamentId) {
                    const tRef = ref(db, `tournaments/${currentEditingTournamentId}`);
                    const existing = await get(tRef);
                    if (existing.exists() && existing.val().registeredPlayers) tournamentData.registeredPlayers = existing.val().registeredPlayers;
                    await update(tRef, tournamentData);
                    showStatus(statusEl, "Tournament updated!", "success", 3000);
                } else {
                    tournamentData.createdAt = serverTimestamp();
                    const newRef = push(ref(db, 'tournaments'));
                    await set(newRef, tournamentData);
                    showStatus(statusEl, "Tournament added!", "success", 3000);
                }

                elements.tournamentForm.reset();
                if (bannerImgbbStatus) { bannerImgbbStatus.textContent = ''; bannerImgbbStatus.style.display = 'none'; }
                currentEditingTournamentId = null;
                getModalInstance(elements.addTournamentModalEl)?.hide();
                loadTournaments(); loadDashboardStats();
            } catch (error) {
                console.error("Error saving tournament:", error);
                showStatus(statusEl, `Error: ${error.message}. Check Rules.`, "danger", false);
            } finally {
                showLoader(false);
                elements.saveTournamentBtn.disabled = false;
            }
        }

        // Delete Game (No change needed)
        async function deleteGame(gameId) { if (!db || !gameId || !isDesignatedAdmin(currentAdminUser)) return; if (!confirm(`DELETE Game ID: ${gameId}? Removes DB entry. Image on ImgBB NOT deleted. OK?`)) return; showLoader(true); const statusEl = elements.gamesStatus; clearStatus(statusEl); try { await remove(ref(db, `games/${gameId}`)); console.log("Game deleted from DB:", gameId); delete gameDataCache[gameId]; showStatus(statusEl, "Game data deleted.", "success", 3000); loadGames(); loadDashboardStats(); } catch (error) { console.error("Error deleting game:", error); showStatus(statusEl, `Error deleting game: ${error.message}. Check Rules.`, "danger", false); } finally { showLoader(false); } }

        // Delete Promotion (No change needed)
        async function deletePromotion(promoId) { if (!db || !promoId || !isDesignatedAdmin(currentAdminUser)) return; if (!confirm(`DELETE Promotion ID: ${promoId}? Removes DB entry. Image on ImgBB NOT deleted. OK?`)) return; showLoader(true); const statusEl = elements.promotionsStatus; clearStatus(statusEl); try { await remove(ref(db, `promotions/${promoId}`)); console.log("Promotion deleted from DB:", promoId); showStatus(statusEl, "Promotion data deleted.", "success", 3000); loadPromotions(); loadDashboardStats(); } catch (error) { console.error("Error deleting promotion:", error); showStatus(statusEl, `Error deleting promotion: ${error.message}. Check Rules.`, "danger", false); } finally { showLoader(false); } }

        // Delete Tournament (No change needed)
        async function deleteTournament(tournamentId) { if (!db || !tournamentId || !isDesignatedAdmin(currentAdminUser)) return; if (!confirm(`DELETE Tournament ID: ${tournamentId}? Cannot be undone.`)) return; showLoader(true); const statusEl = elements.tournamentsStatus; clearStatus(statusEl); try { await remove(ref(db, `tournaments/${tournamentId}`)); console.log("Tournament deleted:", tournamentId); showStatus(statusEl, "Tournament deleted.", "success", 3000); loadTournaments(); loadDashboardStats(); } catch (error) { console.error("Error deleting tournament:", error); showStatus(statusEl, `Error: ${error.message}. Check Rules.`, "danger", false); } finally { showLoader(false); } }

        // Save New User (No change needed)
        async function saveNewUser() { if (!auth || !db || !isDesignatedAdmin(currentAdminUser)) return; const statusEl = elements.addUserStatus; clearStatus(statusEl); const name = elements.newUserNameInput.value.trim(); const email = elements.newUserEmailInput.value.trim(); const password = elements.newUserPasswordInput.value; const initialBalanceStr = elements.newUserInitialBalanceInput.value; if (!name || !email || !password) { showStatus(statusEl, "Name, Email, Password required.", "warning"); return; } if (password.length < 6) { showStatus(statusEl, "Password min 6 chars.", "warning"); return; } const initialBalance = parseFloat(initialBalanceStr) || 0; if (initialBalance < 0) { showStatus(statusEl, "Initial Balance cannot be negative.", "warning"); return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showStatus(statusEl, "Invalid Email format.", "warning"); return; }
            // IMPORTANT: createUserWithEmailAndPassword signs in the new user, logging out the admin!
            // We use the Admin SDK via Firebase REST API workaround or warn the admin.
            showStatus(statusEl, "⚠️ Warning: Creating a user via client SDK will sign out the current admin session. Use Firebase Console to create users instead, or re-login after creation.", "warning", false);
            if (!confirm("Creating a user here will SIGN OUT your admin account. You will need to log back in.\n\nProceed anyway?")) return;
            showLoader(true); elements.saveNewUserBtn.disabled = true; try { const referralCode = Math.random().toString(36).substring(2, 10).toUpperCase(); const cred = await createUserWithEmailAndPassword(auth, email, password); const uid = cred.user.uid; console.log("User created in Auth:", uid, email); const userData = { uid: uid, email: email, displayName: name, balance: initialBalance, winningCash: 0, bonusCash: 0, status: 'active', createdAt: serverTimestamp(), referralCode: referralCode, isAdmin: false, referralEarnings: 0, totalEarnings: 0, totalMatches: 0, wonMatches: 0 }; await set(ref(db, `users/${uid}`), userData); console.log("User data created in DB:", uid); showStatus(statusEl, `User ${name} created! You have been signed out. Please log back in.`, "success", false); elements.addUserForm.reset(); getModalInstance(elements.addUserModalEl)?.hide(); } catch (error) { console.error("Error creating user:", error); let msg = `Error: ${error.message}`; if (error.code === 'auth/email-already-in-use') msg = "Email already registered."; else if (error.code === 'auth/weak-password') msg = "Password too weak."; else if (error.code === 'auth/invalid-email') msg = "Invalid email format."; else if (error.code === 'permission-denied') msg = "Permission denied creating user/DB entry. Check Rules."; showStatus(statusEl, msg, "danger", false); } finally { showLoader(false); elements.saveNewUserBtn.disabled = false; } }

        // Update User Balance (No change needed)
        async function updateUserBalance(event) { event.preventDefault(); if (!db || !isDesignatedAdmin(currentAdminUser)) return; const statusEl = elements.balanceUpdateStatus; clearStatus(statusEl); const userId = elements.editUserUid.value; const amountStr = elements.balanceUpdateAmountInput.value; const type = elements.balanceUpdateTypeSelect.value; const reason = elements.balanceUpdateReasonInput.value.trim(); if (!userId || !amountStr || !type || !reason) { showStatus(statusEl, "All fields required.", "warning"); return; } const amount = parseFloat(amountStr); if (isNaN(amount) || amount === 0) { showStatus(statusEl, "Invalid or zero amount.", "warning"); return; } showLoader(true); const userRefPath = `users/${userId}`; const updates = {}; try { const userSnapshot = await get(ref(db, userRefPath)); if (!userSnapshot.exists()) throw new Error(`User ${userId} not found.`); const user = userSnapshot.val(); const currentBalance = Number(user.balance || 0); const currentWinning = Number(user.winningCash || 0); const currentBonus = Number(user.bonusCash || 0); let newBalance = currentBalance; let newWinning = currentWinning; let newBonus = currentBonus; let logType = ''; switch (type) { case 'balance': newBalance += amount; updates[`${userRefPath}/balance`] = newBalance; logType = amount > 0 ? 'admin_deposit' : 'admin_deduction'; break; case 'winningCash': newWinning += amount; newBalance += amount; if (newWinning < 0) throw new Error("Winning cash cannot be negative."); updates[`${userRefPath}/winningCash`] = newWinning; updates[`${userRefPath}/balance`] = newBalance; logType = amount > 0 ? 'admin_winning_add' : 'admin_winning_deduct'; break; case 'bonusCash': newBonus += amount; newBalance += amount; if (newBonus < 0) throw new Error("Bonus cash cannot be negative."); updates[`${userRefPath}/bonusCash`] = newBonus; updates[`${userRefPath}/balance`] = newBalance; logType = amount > 0 ? 'admin_bonus_add' : 'admin_bonus_deduct'; break; default: throw new Error("Invalid balance type."); } if (newBalance < 0 && !confirm(`Warning: Negative total balance (${formatCurrency(newBalance)}). Proceed?`)) { showLoader(false); showStatus(statusEl, "Update cancelled.", "info"); return; } const txKey = push(ref(db, `transactions/${userId}`)).key; const txData = { type: logType, amount: amount, timestamp: serverTimestamp(), description: `Admin Update: ${reason}`, status: 'completed', balanceAfter: newBalance, adminUid: currentAdminUser.uid }; updates[`transactions/${userId}/${txKey}`] = txData; await update(ref(db), updates); console.log(`Balance updated for ${userId}. New Bal: ${newBalance}, Win: ${newWinning}, Bonus: ${newBonus}`); elements.userDetailBalance.textContent = formatCurrency(newBalance); elements.userDetailWinning.textContent = formatCurrency(newWinning); elements.userDetailBonus.textContent = formatCurrency(newBonus); if (fullUserDataCache[userId]) { fullUserDataCache[userId].balance = newBalance; fullUserDataCache[userId].winningCash = newWinning; fullUserDataCache[userId].bonusCash = newBonus; } if (userDataCache[userId]) { userDataCache[userId].balance = newBalance; userDataCache[userId].winningCash = newWinning; } showStatus(statusEl, "Balance updated!", "success", 3000); elements.updateBalanceForm.reset(); } catch (error) { console.error("Error updating balance:", error); showStatus(statusEl, `Error: ${error.message}`, "danger", false); } finally { showLoader(false); } }

        // Toggle User Block (No change needed)
        async function toggleUserBlock(event) { const button = event.target.closest('button'); if (!button || !db || !isDesignatedAdmin(currentAdminUser)) return; const userId = button.dataset.id; const currentAction = button.dataset.action; if (!userId || !currentAction) return; const newStatus = currentAction === 'block' ? 'blocked' : 'active'; if (!confirm(`Confirm ${currentAction} user ${userId}?`)) return; showLoader(true); button.disabled = true; const modalVisible = getModalInstance(elements.userModalEl)?._isShown; const statusEl = modalVisible && elements.editUserUid.value === userId ? elements.balanceUpdateStatus : elements.usersStatus; clearStatus(statusEl); try { await set(ref(db, `users/${userId}/status`), newStatus); console.log(`User ${userId} status set to ${newStatus}`); if (fullUserDataCache[userId]) fullUserDataCache[userId].status = newStatus; if (userDataCache[userId]) userDataCache[userId].status = newStatus; showStatus(statusEl, `User ${newStatus} successfully!`, "success", 3000); if (modalVisible && elements.editUserUid.value === userId) { elements.userDetailStatus.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1); elements.userDetailStatus.className = `fw-bold text-${newStatus === 'active' ? 'success' : 'danger'}`; button.textContent = newStatus === 'active' ? 'Block User' : 'Unblock User'; button.className = `btn btn-sm ${newStatus === 'active' ? 'btn-danger' : 'btn-success'}`; button.dataset.action = newStatus === 'active' ? 'block' : 'unblock'; } filterUsers(); } catch (error) { console.error(`Error ${currentAction}ing user:`, error); showStatus(statusEl, `Error ${currentAction}ing user: ${error.message}. Check Rules.`, "danger", false); } finally { showLoader(false); button.disabled = false; } }

        // Delete User (No change needed)
        async function deleteUser(userId) { if (!db || !userId || !isDesignatedAdmin(currentAdminUser)) return; const userName = fullUserDataCache[userId]?.displayName || fullUserDataCache[userId]?.email || userId; if (!confirm(`DELETE USER: ${userName} (UID: ${userId})?\n\nWARNING:\n- Removes user data from Realtime Database ONLY.\n- DOES NOT delete from Firebase Auth.\n- Associated data (transactions, etc.) may be orphaned.\n\nCannot be undone. Proceed?`)) return; showLoader(true); const statusEl = elements.usersStatus; clearStatus(statusEl); const modal = getModalInstance(elements.userModalEl); if (modal?._isShown) modal.hide(); try { await remove(ref(db, `users/${userId}`)); console.log("User deleted from DB:", userId); delete fullUserDataCache[userId]; delete userDataCache[userId]; showStatus(statusEl, `User ${userName} deleted from Database.`, "success", 5000); filterUsers(); loadDashboardStats(); } catch (error) { console.error("Error deleting user from DB:", error); showStatus(statusEl, `Error deleting user data: ${error.message}. Check Rules.`, "danger", false); } finally { showLoader(false); } }

        // Open Withdrawal Modal (No change needed)
        async function openWithdrawalActionModal(withdrawalId, type) { if (!db || !withdrawalId || !type || !isDesignatedAdmin(currentAdminUser)) return; console.log(`Opening withdrawal modal: ${withdrawalId}, Action: ${type}`); showLoader(true); currentWithdrawalAction = { id: withdrawalId, type: type, userId: null }; elements.withdrawalRejectReasonInput.value = ''; elements.withdrawalApproveNoteInput.value = ''; elements.withdrawalRejectReasonDiv.style.display = 'none'; elements.withdrawalApproveNoteDiv.style.display = 'none'; elements.withdrawalRejectReasonInput.required = false; elements.withdrawalApproveNoteInput.required = false; clearStatus(elements.withdrawalActionStatus); elements.approveWithdrawalBtn.style.display = 'inline-block'; elements.rejectWithdrawalBtn.style.display = 'inline-block'; elements.approveWithdrawalBtn.disabled = false; elements.rejectWithdrawalBtn.disabled = false; const withdrawalRef = ref(db, `withdrawals/${withdrawalId}`); try { const snapshot = await get(withdrawalRef); if (!snapshot.exists()) throw new Error(`Withdrawal ${withdrawalId} not found.`); const w = snapshot.val(); currentWithdrawalAction.userId = w.userId; if (w.status !== 'pending') { alert(`Request already processed (Status: ${w.status}).`); showLoader(false); return; } let userDisplay = `UID: ${w.userId}`; const userId = w.userId; if (userId && userDataCache[userId]) { const u = userDataCache[userId]; userDisplay = `${sanitizeHTML(u.displayName)} (<small class="text-muted" title="${userId}">${sanitizeHTML(u.email)}</small>)`; } else if (userId) { try { const userSnap = await get(ref(db, `users/${userId}`)); if (userSnap.exists()) { const u = userSnap.val(); userDataCache[userId] = { displayName: u.displayName || 'N/A', email: u.email || userId, status: u.status || 'unknown' }; userDisplay = `${sanitizeHTML(u.displayName)} (<small class="text-muted" title="${userId}">${sanitizeHTML(u.email)}</small>)`; } else { userDataCache[userId] = { displayName: 'Unknown User', email: userId, status: 'deleted' }; userDisplay = `Unknown User (<small class="text-muted" title="${userId}">${userId}</small>)`; } } catch (err) { console.warn(`Could not fetch user ${userId}`, err); userDataCache[userId] = { displayName: 'Error Fetching', email: userId, status: 'error' }; userDisplay = `Error Fetching (<small class="text-muted" title="${userId}">${userId}</small>)`; } } let methodDisplay = sanitizeHTML(w.methodDetails?.methodName || w.method || 'N/A'); if (w.methodDetails?.accountInfo) methodDisplay += ` - ${sanitizeHTML(w.methodDetails.accountInfo)}`; elements.withdrawalDetailId.textContent = withdrawalId; elements.withdrawalDetailUser.innerHTML = userDisplay; elements.withdrawalDetailUserUid.textContent = userId || 'N/A'; elements.withdrawalDetailAmount.textContent = (w.amount || 0).toFixed(2); elements.withdrawalDetailMethod.textContent = methodDisplay; if (type === 'reject') { elements.withdrawalRejectReasonDiv.style.display = 'block'; elements.withdrawalRejectReasonInput.required = true; elements.approveWithdrawalBtn.style.display = 'none'; } else { elements.withdrawalApproveNoteDiv.style.display = 'block'; elements.rejectWithdrawalBtn.style.display = 'none'; } getModalInstance(elements.withdrawalActionModalEl)?.show(); } catch (error) { console.error("Error opening withdrawal modal:", error); alert(`Error fetching details: ${error.message}`); showStatus(elements.withdrawalsStatus, `Error fetching details: ${error.message}`, 'danger', false); } finally { showLoader(false); } }

        // Process Withdrawal (No change needed)
        async function processWithdrawalAction() { if (!db || !currentWithdrawalAction.id || !currentWithdrawalAction.type || !currentWithdrawalAction.userId || !isDesignatedAdmin(currentAdminUser)) { console.error("Withdrawal details missing or unauthorized."); showStatus(elements.withdrawalActionStatus, "Internal error/unauthorized.", "danger", false); return; } const statusEl = elements.withdrawalActionStatus; clearStatus(statusEl); const withdrawalId = currentWithdrawalAction.id; const actionType = currentWithdrawalAction.type; const userId = currentWithdrawalAction.userId; const updates = {}; const withdrawalRefPath = `withdrawals/${withdrawalId}`; let reason = ''; let adminNote = ''; let logType = ''; let logStatus = 'failed'; let refundRequired = false; showLoader(true); elements.approveWithdrawalBtn.disabled = true; elements.rejectWithdrawalBtn.disabled = true; try { const wSnapshot = await get(ref(db, withdrawalRefPath)); if (!wSnapshot.exists()) throw new Error("Withdrawal request not found."); const wData = wSnapshot.val(); const amount = Number(wData.amount || 0); if (wData.status !== 'pending') throw new Error(`Request already processed (Status: ${wData.status}).`); if (amount <= 0) throw new Error("Invalid amount."); if (actionType === 'reject') { reason = elements.withdrawalRejectReasonInput.value.trim(); if (!reason) { elements.rejectWithdrawalBtn.disabled = false; throw new Error("Rejection reason required."); } updates[`${withdrawalRefPath}/status`] = 'rejected'; updates[`${withdrawalRefPath}/rejectReason`] = reason; updates[`${withdrawalRefPath}/processedAt`] = serverTimestamp(); updates[`${withdrawalRefPath}/processedBy`] = currentAdminUser.uid; refundRequired = true; logType = 'withdrawal_rejected'; logStatus = 'completed'; } else { adminNote = elements.withdrawalApproveNoteInput.value.trim(); updates[`${withdrawalRefPath}/status`] = 'completed'; updates[`${withdrawalRefPath}/adminNote`] = adminNote || 'Approved'; updates[`${withdrawalRefPath}/processedAt`] = serverTimestamp(); updates[`${withdrawalRefPath}/processedBy`] = currentAdminUser.uid; refundRequired = false; logType = 'withdrawal_approved'; logStatus = 'completed'; } if (refundRequired) { const uSnapshot = await get(ref(db, `users/${userId}`)); if (!uSnapshot.exists()) throw new Error(`User ${userId} not found for refund.`); const user = uSnapshot.val(); const currentWinning = Number(user.winningCash || 0); const currentBalance = Number(user.balance || 0); const newWinning = currentWinning + amount; const newBalance = currentBalance + amount; updates[`users/${userId}/winningCash`] = newWinning; updates[`users/${userId}/balance`] = newBalance; const refundTxKey = push(ref(db, `transactions/${userId}`)).key; updates[`transactions/${userId}/${refundTxKey}`] = { type: 'withdrawal_refund', amount: amount, timestamp: serverTimestamp(), description: `Refund rejected withdrawal: ${withdrawalId}. Reason: ${reason}`, status: 'completed', balanceAfter: newBalance, adminUid: currentAdminUser.uid }; console.log(`Prepared refund for ${userId}. New Bal: ${newBalance}`); if (fullUserDataCache[userId]) { fullUserDataCache[userId].balance = newBalance; fullUserDataCache[userId].winningCash = newWinning; } if (userDataCache[userId]) { userDataCache[userId].balance = newBalance; userDataCache[userId].winningCash = newWinning; } } const mainTxKey = push(ref(db, `transactions/${userId}`)).key; updates[`transactions/${userId}/${mainTxKey}`] = { type: logType, amount: 0, timestamp: serverTimestamp(), description: `Withdrawal ${actionType} by admin. ID: ${withdrawalId}. ${actionType === 'reject' ? `Reason: ${reason}` : `Note: ${adminNote}`}`, status: logStatus, withdrawalId: withdrawalId, adminUid: currentAdminUser.uid }; await update(ref(db), updates); console.log(`Withdrawal ${withdrawalId} ${actionType} processed.`); showStatus(elements.withdrawalsStatus, `Withdrawal ${actionType} successfully!`, "success", 4000); getModalInstance(elements.withdrawalActionModalEl)?.hide(); loadDashboardStats(); } catch (error) { console.error("Error processing withdrawal:", error); showStatus(statusEl, `Error: ${error.message}. Check Rules.`, "danger", false); } finally { showLoader(false); if (getModalInstance(elements.withdrawalActionModalEl)?._isShown) { elements.approveWithdrawalBtn.disabled = false; elements.rejectWithdrawalBtn.disabled = false; } } }

        // Save Settings
        async function saveSettings(event) { event.preventDefault(); if (!db || !isDesignatedAdmin(currentAdminUser)) return; const statusEl = elements.settingsStatus; clearStatus(statusEl); const minW = parseFloat(elements.settingMinWithdrawInput.value) || 0; const refB = parseFloat(elements.settingReferralBonusInput.value) || 0; const signupB = parseFloat(elements.settingSignupBonusInput.value) || 0; if (minW < 0 || refB < 0 || signupB < 0) { showStatus(statusEl, "Numeric values cannot be negative.", "warning"); return; } const pm = elements.pmGatewayRadio?.checked ? 'gateway' : 'manual';
        const settingsData = { logoUrl: elements.settingLogoUrlInput.value.trim(), appName: elements.settingAppNameInput.value.trim(), minWithdraw: minW, referralBonus: refB, signupBonus: signupB, imgbbApiKey: (elements.settingImgbbApiKey?.value || '').trim(), supportContact: elements.settingSupportContactInput.value.trim(), upiDetails: elements.settingUpiDetailsInput.value.trim(), policyPrivacy: elements.settingPolicyPrivacyInput.value.trim(), policyTerms: elements.settingPolicyTermsInput.value.trim(), policyRefund: elements.settingPolicyRefundInput.value.trim(), policyFairPlay: elements.settingPolicyFairPlayInput.value.trim(),
        paymentMethod: pm,
        payUpiId: (elements.settingPayUpiId?.value || '').trim(),
        payQrUrl: (elements.settingPayQrUrl?.value || '').trim(),
        payInstructions: (elements.settingPayInstructions?.value || '').trim(),
        zapupiUrl: (elements.settingZapupiUrl?.value || '').trim(),
        zapupikey: (elements.settingZapupiKey?.value || '').trim(),
        lastUpdated: serverTimestamp() }; showLoader(true); elements.appSettingsForm?.querySelectorAll('input, textarea, button').forEach(el => el.disabled = true); try { await set(ref(db, 'settings'), settingsData); appSettings = settingsData; console.log("Settings saved:", appSettings); showStatus(statusEl, "Settings saved!", "success", 3000); if(elements.adminHeaderLogo) { const logoUrl = appSettings.logoUrl; elements.adminHeaderLogo.src = logoUrl || 'https://via.placeholder.com/35/1E293B/94A3B8?text=L'; elements.adminHeaderLogo.style.display = logoUrl ? 'inline-block' : 'none'; elements.adminHeaderLogo.alt = appSettings.appName ? `${appSettings.appName} Logo` : 'Logo'; } document.title = `${appSettings.appName || 'Gaming Tournament'} - Admin Panel`; } catch (error) { console.error("Error saving settings:", error); showStatus(statusEl, `Error: ${error.message}. Check Rules.`, "danger", false); } finally { showLoader(false); elements.appSettingsForm?.querySelectorAll('input, textarea, button').forEach(el => el.disabled = false); } }
        
        // ===================================
        // NEW: THEME MANAGEMENT FUNCTIONS
        // ===================================

        /**
         * Loads the current theme from Firebase and populates the color pickers.
         * Falls back to the default theme if no theme is set in the DB.
         */
        async function loadThemeSettings() {
            if (!db || !isDesignatedAdmin(currentAdminUser)) return;
            console.log("Loading theme settings...");
            const statusEl = elements.themeStatus;
            clearStatus(statusEl);
            try {
                const settingsSnap = await get(ref(db, 'settings'));
                const currentTheme = settingsSnap.exists() ? settingsSnap.val().theme : null;

                if (currentTheme) {
                    console.log("Found custom theme in DB:", currentTheme);
                    populateThemePickers(currentTheme);
                } else {
                    console.log("No custom theme in DB, loading default.");
                    populateThemePickers(defaultTheme);
                    showStatus(statusEl, "Currently using the default theme. Customize and save to change it.", "info", 10000);
                }
            } catch (error) {
                console.error("Error loading theme settings:", error);
                showStatus(statusEl, `Error loading theme: ${error.message}`, "danger", false);
                populateThemePickers(defaultTheme); // Fallback to default on error
            }
        }

        /**
         * Populates the color picker inputs based on a theme object.
         * @param {object} theme - The theme object (e.g., defaultTheme, crimsonTheme).
         */
        function populateThemePickers(theme) {
            elements.themeColorPickers.forEach(picker => {
                const cssVar = picker.dataset.var;
                const colorValue = theme[cssVar] || '#000000'; // Fallback to black if property is missing
                picker.value = colorValue;
                // Also update the text input next to it
                const textInput = picker.parentElement.querySelector(`input[type="text"][data-target="${picker.id}"]`);
                if (textInput) {
                    textInput.value = colorValue;
                }
            });
        }

        /**
         * Saves the current colors from the pickers to Firebase under /settings/theme.
         */
        async function saveTheme() {
            if (!db || !isDesignatedAdmin(currentAdminUser)) return;
            const statusEl = elements.themeStatus;
            clearStatus(statusEl);
            
            const themeData = {};
            elements.themeColorPickers.forEach(picker => {
                const cssVar = picker.dataset.var;
                // Basic validation for hex color
                if (cssVar && /^#[0-9A-F]{6}$/i.test(picker.value)) {
                    themeData[cssVar] = picker.value;
                } else {
                    console.warn(`Skipping invalid color for ${cssVar}: ${picker.value}`);
                }
            });

            // A special case for accent-gradient as it's derived
            if(themeData['--accent-color']) {
                themeData['--accent-gradient'] = `linear-gradient(to right, ${themeData['--accent-color']}, #FBBF24)`; // This could be improved, but is a simple approach
            }

            if (Object.keys(themeData).length < elements.themeColorPickers.length) {
                showStatus(statusEl, "One or more colors are invalid. Please check the values.", "warning");
                return;
            }

            showLoader(true);
            elements.saveThemeBtn.disabled = true;
            try {
                // We use update to avoid overwriting other settings
                await update(ref(db, 'settings'), { theme: themeData });
                console.log("Theme saved successfully:", themeData);
                showStatus(statusEl, "Theme saved successfully! Changes will appear for users in real-time.", "success", 5000);
            } catch (error) {
                console.error("Error saving theme:", error);
                showStatus(statusEl, `Error saving theme: ${error.message}. Check Rules.`, "danger", false);
            } finally {
                showLoader(false);
                elements.saveThemeBtn.disabled = false;
            }
        }

        /**
         * Resets the theme by removing the theme object from Firebase.
         */
        async function resetTheme() {
            if (!db || !isDesignatedAdmin(currentAdminUser)) return;
            if (!confirm("Are you sure you want to reset to the default theme? This will remove your custom theme settings.")) {
                return;
            }
            const statusEl = elements.themeStatus;
            clearStatus(statusEl);
            showLoader(true);
            elements.resetThemeBtn.disabled = true;

            try {
                // To reset, we simply remove the 'theme' key from the settings
                await remove(ref(db, 'settings/theme'));
                console.log("Theme reset successfully.");
                showStatus(statusEl, "Theme has been reset to default.", "success", 5000);
                // Repopulate the pickers with the default values after reset
                populateThemePickers(defaultTheme);
            } catch (error) {
                console.error("Error resetting theme:", error);
                showStatus(statusEl, `Error resetting theme: ${error.message}. Check Rules.`, "danger", false);
            } finally {
                showLoader(false);
                elements.resetThemeBtn.disabled = false;
            }
        }


        // =========================================================================
        // NOTIFICATIONS FUNCTIONS
        // =========================================================================

        async function loadNotificationsSection() {
            if (!db || !isDesignatedAdmin(currentAdminUser)) return;
            // Load welcome message
            try {
                const welcomeSnap = await get(ref(db, 'settings/welcomeMessage'));
                if (welcomeSnap.exists()) {
                    const wm = welcomeSnap.val();
                    if (elements.welcomeTitle) elements.welcomeTitle.value = wm.title || '';
                    if (elements.welcomeMessage) elements.welcomeMessage.value = wm.message || '';
                    if (elements.welcomeImageUrl) elements.welcomeImageUrl.value = wm.imageUrl || '';
                }
            } catch(e) { console.warn("Could not load welcome message:", e); }
            // Load notifications list
            loadNotifList();
        }

        async function loadNotifList() {
            if (!elements.notifListContainer) return;
            elements.notifListContainer.innerHTML = '<div class="text-center text-secondary p-3"><div class="spinner-border spinner-border-sm"></div></div>';
            try {
                const snap = await get(ref(db, 'notifications'));
                if (!snap.exists()) {
                    elements.notifListContainer.innerHTML = '<p class="text-secondary text-center p-3 small">No notifications sent yet.</p>';
                    return;
                }
                const notifs = [];
                snap.forEach(child => notifs.push({ id: child.key, ...child.val() }));
                notifs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

                let html = '';
                notifs.forEach(n => {
                    const time = n.createdAt ? new Date(n.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'N/A';
                    const targetBadge = n.targetEmail ? `<span class="badge bg-info text-dark ms-1" style="font-size:0.65rem;">${sanitizeHTML(n.targetEmail)}</span>` : `<span class="badge bg-secondary ms-1" style="font-size:0.65rem;">All Users</span>`;
                    html += `<div style="padding:10px 8px;border-bottom:1px solid var(--border-color);display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                        <div style="flex:1;min-width:0;">
                            <div style="font-size:0.85rem;font-weight:600;color:var(--text-primary);">${sanitizeHTML(n.title || 'No Title')} ${targetBadge}</div>
                            <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:2px;">${sanitizeHTML(n.message || '')}</div>
                            <div style="font-size:0.72rem;color:var(--text-muted-custom);margin-top:3px;">${time}</div>
                        </div>
                        ${n.imageUrl ? `<img src="${sanitizeHTML(n.imageUrl)}" style="width:44px;height:44px;object-fit:cover;border-radius:6px;flex-shrink:0;" alt="">` : ''}
                        <button class="btn btn-sm btn-outline-danger btn-delete-notif" data-id="${sanitizeHTML(n.id)}" style="flex-shrink:0;padding:2px 6px;font-size:0.75rem;"><i class="bi bi-trash"></i></button>
                    </div>`;
                });
                elements.notifListContainer.innerHTML = html || '<p class="text-secondary text-center p-3 small">No notifications.</p>';
            } catch(e) {
                console.error("Error loading notif list:", e);
                elements.notifListContainer.innerHTML = '<p class="text-danger text-center p-3 small">Error loading notifications.</p>';
            }
        }

        async function sendNotification() {
            if (!db || !isDesignatedAdmin(currentAdminUser)) return;
            const statusEl = elements.notifSendStatus;
            clearStatus(statusEl);

            const title = elements.notifTitle?.value.trim();
            const message = elements.notifMessage?.value.trim();
            if (!title || !message) { showStatus(statusEl, "Title aur Message required hain.", "warning"); return; }

            const targetType = document.querySelector('input[name="notifTarget"]:checked')?.value || 'all';
            const targetEmail = targetType === 'single' ? elements.notifUserEmail?.value.trim() : null;
            if (targetType === 'single' && !targetEmail) { showStatus(statusEl, "Single user ke liye email enter karein.", "warning"); return; }

            showLoader(true);
            if (elements.sendNotifBtn) elements.sendNotifBtn.disabled = true;

            try {
                let finalImageUrl = elements.notifImageUrl?.value.trim() || null;
                const imgFile = elements.notifImageFile?.files[0];
                if (imgFile) {
                    finalImageUrl = await uploadToImgBB(imgFile, elements.notifImgbbStatus);
                }

                const notifData = {
                    title,
                    message,
                    imageUrl: finalImageUrl || null,
                    createdAt: Date.now(),
                    targetEmail: targetEmail || null, // null = all users
                };

                // Save to /notifications (used by notice bar AND notification page)
                await push(ref(db, 'notifications'), notifData);

                // If targeting single user, also write to their personal notifications
                if (targetEmail) {
                    // Find user by email
                    const usersSnap = await get(ref(db, 'users'));
                    let targetUid = null;
                    if (usersSnap.exists()) {
                        usersSnap.forEach(child => {
                            if (child.val().email === targetEmail) targetUid = child.key;
                        });
                    }
                    if (targetUid) {
                        await push(ref(db, `userNotifications/${targetUid}`), notifData);
                    } else {
                        showStatus(statusEl, `Warning: User with email "${targetEmail}" not found. Saved in global notifications only.`, "warning", 5000);
                    }
                }

                // Clear form
                if (elements.notifTitle) elements.notifTitle.value = '';
                if (elements.notifMessage) elements.notifMessage.value = '';
                if (elements.notifImageUrl) elements.notifImageUrl.value = '';
                if (elements.notifImageFile) elements.notifImageFile.value = '';
                if (elements.notifImgbbStatus) { elements.notifImgbbStatus.textContent = ''; elements.notifImgbbStatus.style.display = 'none'; }
                if (elements.notifImagePreviewDiv) elements.notifImagePreviewDiv.style.display = 'none';

                showStatus(statusEl, `Notification sent successfully! ${targetEmail ? `To: ${targetEmail}` : 'To: All Users'}`, "success", 4000);
                loadNotifList(); // Refresh list
            } catch(e) {
                console.error("Error sending notification:", e);
                showStatus(statusEl, `Error: ${e.message}`, "danger", false);
            } finally {
                showLoader(false);
                if (elements.sendNotifBtn) elements.sendNotifBtn.disabled = false;
            }
        }

        async function saveWelcomeMessage() {
            if (!db || !isDesignatedAdmin(currentAdminUser)) return;
            const statusEl = elements.welcomeMsgStatus;
            clearStatus(statusEl);
            const title = elements.welcomeTitle?.value.trim();
            const message = elements.welcomeMessage?.value.trim();
            if (!title || !message) { showStatus(statusEl, "Title aur Message required hain.", "warning"); return; }

            showLoader(true);
            if (elements.saveWelcomeMsgBtn) elements.saveWelcomeMsgBtn.disabled = true;
            try {
                let finalImageUrl = elements.welcomeImageUrl?.value.trim() || null;
                const imgFile = elements.welcomeImageFile?.files[0];
                if (imgFile) {
                    finalImageUrl = await uploadToImgBB(imgFile, elements.welcomeImgbbStatus);
                }
                await set(ref(db, 'settings/welcomeMessage'), { title, message, imageUrl: finalImageUrl || null });
                showStatus(statusEl, "Welcome message saved!", "success", 3000);
            } catch(e) {
                console.error("Error saving welcome message:", e);
                showStatus(statusEl, `Error: ${e.message}`, "danger", false);
            } finally {
                showLoader(false);
                if (elements.saveWelcomeMsgBtn) elements.saveWelcomeMsgBtn.disabled = false;
            }
        }

        async function deleteNotification(notifId) {
            if (!notifId || !confirm("Delete this notification?")) return;
            try {
                await remove(ref(db, `notifications/${notifId}`));
                loadNotifList();
            } catch(e) { alert("Error deleting: " + e.message); }
        }

        async function clearAllNotifications() {
            if (!confirm("Saari notifications delete karein? Yeh undo nahi hoga.")) return;
            showLoader(true);
            try {
                await remove(ref(db, 'notifications'));
                loadNotifList();
                showStatus(elements.notifSendStatus, "All notifications cleared.", "success", 3000);
            } catch(e) { alert("Error: " + e.message); } finally { showLoader(false); }
        }


        // ── ANNOUNCEMENTS ──────────────────────────────────────────────
        async function loadAnnList() {
            if (!elements.annListContainer) return;
            elements.annListContainer.innerHTML = '<div class="text-center text-secondary p-3"><div class="spinner-border spinner-border-sm"></div></div>';
            try {
                const snap = await get(ref(db, 'announcements'));
                if (!snap.exists()) {
                    elements.annListContainer.innerHTML = '<p class="text-secondary text-center p-3 small">Koi announcement nahi hai abhi.</p>';
                    return;
                }
                const items = [];
                snap.forEach(child => items.push({ id: child.key, ...child.val() }));
                items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                let html = '';
                items.forEach(ann => {
                    const time = ann.createdAt ? new Date(ann.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'N/A';
                    html += `<div style="padding:12px 8px; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
                        <div style="flex:1; min-width:0;">
                            <div style="font-size:0.85rem; color:var(--text-primary); white-space:pre-line; line-height:1.5;">${sanitizeHTML(ann.message || '')}</div>
                            <div style="font-size:0.7rem; color:var(--text-muted-custom); margin-top:5px;"><i class="bi bi-clock me-1"></i>${time}</div>
                        </div>
                        <button class="btn btn-sm btn-outline-danger flex-shrink-0 ann-delete-btn" data-id="${ann.id}" title="Delete"><i class="bi bi-trash"></i></button>
                    </div>`;
                });
                elements.annListContainer.innerHTML = html || '<p class="text-secondary text-center p-3 small">No announcements.</p>';
                elements.annListContainer.querySelectorAll('.ann-delete-btn').forEach(btn => {
                    btn.addEventListener('click', async () => {
                        if (!confirm("Yeh announcement delete karein?")) return;
                        try {
                            await remove(ref(db, `announcements/${btn.dataset.id}`));
                            loadAnnList();
                        } catch(e) { alert("Delete error: " + e.message); }
                    });
                });
            } catch(e) {
                elements.annListContainer.innerHTML = '<p class="text-danger text-center p-3 small">Error loading announcements.</p>';
            }
        }

        async function saveAnnouncement() {
            const message = elements.annMessage?.value?.trim();
            if (!message) {
                showStatus(elements.annCreateStatus, "Message required hai.", "danger", 3000);
                return;
            }
            if (!elements.saveAnnBtn) return;
            elements.saveAnnBtn.disabled = true;
            elements.saveAnnBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Posting...';
            try {
                await push(ref(db, 'announcements'), { message, createdAt: Date.now() });
                showStatus(elements.annCreateStatus, "Announcement post ho gayi! ✓", "success", 4000);
                if (elements.annMessage) elements.annMessage.value = '';
                loadAnnList();
            } catch(e) {
                showStatus(elements.annCreateStatus, "Error: " + e.message, "danger", 5000);
            } finally {
                elements.saveAnnBtn.disabled = false;
                elements.saveAnnBtn.innerHTML = '<i class="bi bi-megaphone-fill me-2"></i>Post Announcement';
            }
        }

        async function clearAllAnnouncements() {
            if (!confirm("Saari announcements delete karein? Yeh undo nahi hoga.")) return;
            showLoader(true);
            try {
                await remove(ref(db, 'announcements'));
                loadAnnList();
                showStatus(elements.annCreateStatus, "All announcements cleared.", "success", 3000);
            } catch(e) { alert("Error: " + e.message); } finally { showLoader(false); }
        }
        // ── End Announcements ────────────────────────────────────────────

        // =========================================================================

        // Add Demo Data (No change needed)
        async function addDemoData() { if (!db || !isDesignatedAdmin(currentAdminUser) || !confirm("Add sample demo data? Only adds if sections are empty.")) return; showLoader(true); elements.addDemoDataBtn.disabled = true; const sectionEl = querySel('#adminMainContent .section.active'); const statusEl = sectionEl?.querySelector('div[id$="Status"]') || elements.dashboardStatus; clearStatus(statusEl); let added = []; const now = Date.now(); try { const gamesRef = ref(db, 'games'); const gamesSnap = await get(gamesRef); let demoGameId = null; if (!gamesSnap.exists() || gamesSnap.numChildren() === 0) { const newRef = push(gamesRef); demoGameId = newRef.key; await set(newRef, { name: "Demo Game (BGMI)", imageUrl: "https://i.ibb.co/4Z5hPVzp/20250418-150058.jpg", createdAt: serverTimestamp() }); added.push("Game"); gameDataCache[demoGameId] = "Demo Game (BGMI)"; } else { const games = gamesSnap.val(); demoGameId = Object.keys(games)[0]; gameDataCache = Object.entries(games).reduce((acc, [id, data]) => { acc[id] = data.name; return acc; }, {}); } const promoRef = ref(db, 'promotions'); const promoSnap = await get(promoRef); if (!promoSnap.exists() || promoSnap.numChildren() === 0) { await set(push(promoRef), { imageUrl: "https://i.ibb.co/RGmQ420n/20250418-150709.jpg", link: "#", createdAt: serverTimestamp() }); added.push("Promotion"); } if (demoGameId) { const tRef = ref(db, 'tournaments'); const tSnap = await get(tRef); if (!tSnap.exists() || tSnap.numChildren() === 0) { await set(push(tRef), { gameId: demoGameId, name: "Weekend Demo Clash", startTime: now + 86400000, status: "upcoming", entryFee: 10, prizePool: 100, perKillPrize: 2, maxPlayers: 50, tags: ["Demo", "Squad"], description: "Sample tournament details.", roomId: null, roomPassword: null, showIdPass: false, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }); added.push("Tournament"); } } const usersRef = ref(db, 'users'); const usersSnap = await get(usersRef); let demoUserNeeded = true; if(usersSnap.exists()){ usersSnap.forEach(uSnap => { if(uSnap.key !== designatedAdminUid) demoUserNeeded = false; }); } if(demoUserNeeded && auth) { try { const demoEmail = `demo${Date.now().toString().slice(-5)}@example.com`, demoPass = "password", cred = await createUserWithEmailAndPassword(auth, demoEmail, demoPass), uid = cred.user.uid, code = Math.random().toString(36).substring(2, 10).toUpperCase(); await set(ref(db, `users/${uid}`), { uid: uid, email: demoEmail, displayName: "Demo User", balance: 50, winningCash: 10, bonusCash: 5, status: 'active', createdAt: serverTimestamp(), referralCode: code, isAdmin: false, referralEarnings: 0, totalEarnings: 0, totalMatches: 0, wonMatches: 0 }); added.push("User (Demo)"); console.log("Created demo user:", demoEmail); } catch (userErr) { console.error("Failed demo user creation:", userErr); } } const settingsRef = ref(db, 'settings'); const settingsSnap = await get(settingsRef); if (!settingsSnap.exists()) { const demoSettings = { appName: "Demo Gaming App", logoUrl: "https://i.ibb.co/BvH3m14/Chat-GPT-Image-Apr-18-2025-05-54-04-PM.png", minWithdraw: 50, referralBonus: 5, supportContact: "support@demo.com", upiDetails: "demo@upi", policyPrivacy: "Demo Privacy Policy.", policyTerms: "Demo Terms.", policyRefund: "Demo Refund Policy.", policyFairPlay: "Demo Fair Play Policy.", lastUpdated: serverTimestamp() }; await set(settingsRef, demoSettings); added.push("Settings"); appSettings = demoSettings; } if (added.length > 0) { showStatus(statusEl, `Demo data added for: ${added.join(', ')}. Refreshing...`, "success", 5000); if (added.includes("Game")) await loadGames(); if (added.includes("Promotion")) await loadPromotions(); if (added.includes("Tournament")) await loadTournaments(); if (added.includes("Settings")) await loadSettings(); if (added.includes("User (Demo)")) await loadUsers(); loadDashboardStats(); } else { showStatus(statusEl, "No demo data added (already exists?).", "info", 5000); } } catch (error) { console.error("Error adding demo data:", error); showStatus(statusEl, `Error adding demo data: ${error.message}. Check Rules.`, "danger", false); } finally { showLoader(false); elements.addDemoDataBtn.disabled = false; } }


        // --- Realtime Admin Listeners Setup --- (Only count listener)
        function setupRealtimeAdminListeners() {
            if (!db || !currentAdminUser || !isDesignatedAdmin(currentAdminUser)) return;
            console.log("Setting up realtime count listeners...");
            detachAllAdminListeners(); // Ensure clean slate

            // Pending Withdrawal Count
            const pendingQuery = query(ref(db, 'withdrawals'), orderByChild('status'), equalTo('pending'));
            const countKey = 'pendingWithdrawalsCount';
            dbListeners[countKey] = onValue(pendingQuery, (snapshot) => {
                 const count = snapshot.exists() ? snapshot.numChildren() : 0; console.log("Realtime pending withdrawal count:", count);
                 if (elements.pendingWithdrawalCountBadge) { elements.pendingWithdrawalCountBadge.textContent = count; elements.pendingWithdrawalCountBadge.style.display = count > 0 ? 'inline-block' : 'none'; }
                 if (elements.dashboardSection?.classList.contains('active') && elements.statPendingWithdrawals) elements.statPendingWithdrawals.textContent = count;
            }, error => {
                console.error("Error listening to pending withdrawals count:", error);
                 if (elements.pendingWithdrawalCountBadge) { elements.pendingWithdrawalCountBadge.textContent = 'Err'; elements.pendingWithdrawalCountBadge.style.display = 'inline-block'; }
                 if (elements.dashboardSection?.classList.contains('active') && elements.statPendingWithdrawals) elements.statPendingWithdrawals.textContent = 'Error';
                 if (error?.message?.includes("index")) showStatus(elements.dashboardStatus, `Count error. Add index '.indexOn': 'status' to '/withdrawals'.`, "danger", false);
                 try { if (dbListeners[countKey]) { off(pendingQuery, 'value', dbListeners[countKey]); delete dbListeners[countKey]; console.log("Detached failed count listener."); } } catch(e) { console.warn("Could not detach failed count listener.", e); }
            });

             console.log("Realtime listeners setup initiated (Count Badge). Other lists load on section view.");
        }

        function detachAllAdminListeners() { // Detaches specific listeners based on keys
             if (!db || Object.keys(dbListeners).length === 0) return;
             console.log("Detaching admin listeners:", Object.keys(dbListeners));
             Object.keys(dbListeners).forEach(key => {
                 try {
                      if (key === 'pendingWithdrawalsCount') off(query(ref(db, 'withdrawals'), orderByChild('status'), equalTo('pending')), 'value', dbListeners[key]);
                      else if (key === 'users') off(ref(db, 'users'), 'value', dbListeners[key]);
                      else if (key.startsWith('withdrawals-')) off(query(ref(db, 'withdrawals'), orderByChild('status'), equalTo(key.split('-')[1])), 'value', dbListeners[key]);
                      else console.warn("Unknown listener key, cannot detach automatically:", key);
                      console.log("Detached listener:", key);
                 } catch (e) { console.warn(`Could not detach listener ${key}`, e); }
             });
             dbListeners = {};
             console.log("Finished detaching listeners.");
        }

        // --- Modal Opening/Population Functions ---

        // *** NEW: openEditGameModal ***
        async function openEditGameModal(gameId) {
            if (!db || !gameId || !isDesignatedAdmin(currentAdminUser)) return;
            console.log("Opening edit game modal for ID:", gameId);
            showLoader(true);
            elements.gameForm.reset();
            clearStatus(elements.gameStatus);
            const imgbbStatusEl = elements.gameForm.querySelector('.imgbb-upload-status');
            if (imgbbStatusEl) { imgbbStatusEl.textContent = ''; imgbbStatusEl.style.display = 'none'; }

            try {
                const snapshot = await get(ref(db, `games/${gameId}`));
                if (!snapshot.exists()) throw new Error(`Game ${gameId} not found.`);
                const game = snapshot.val();

                elements.gameModalTitle.textContent = "Edit Game";
                elements.gameEditId.value = gameId; // Set the hidden ID
                elements.gameNameInput.value = game.name || '';
                elements.gameImageUrlInput.value = game.imageUrl || '';
                // Clear file input as we prioritize URL on load
                elements.gameImageFileInput.value = '';

                getModalInstance(elements.gameModalEl)?.show();
            } catch (error) {
                console.error("Error opening edit game modal:", error);
                showStatus(elements.gamesStatus, `Error loading game for edit: ${error.message}`, "danger", false);
            } finally {
                showLoader(false);
            }
        }

        // *** NEW: openEditPromotionModal ***
        async function openEditPromotionModal(promoId) {
            if (!db || !promoId || !isDesignatedAdmin(currentAdminUser)) return;
            console.log("Opening edit promotion modal for ID:", promoId);
            showLoader(true);
            elements.promotionForm.reset();
            clearStatus(elements.promotionStatus);
            const imgbbStatusEl = elements.promotionForm.querySelector('.imgbb-upload-status');
             if (imgbbStatusEl) { imgbbStatusEl.textContent = ''; imgbbStatusEl.style.display = 'none'; }

            try {
                const snapshot = await get(ref(db, `promotions/${promoId}`));
                if (!snapshot.exists()) throw new Error(`Promotion ${promoId} not found.`);
                const promo = snapshot.val();

                elements.promotionModalTitle.textContent = "Edit Promotion";
                elements.promotionEditId.value = promoId; // Set hidden ID
                elements.promoImageUrlInput.value = promo.imageUrl || '';
                elements.promoLinkInput.value = promo.link || '';
                elements.promoImageFileInput.value = ''; // Clear file input

                getModalInstance(elements.promotionModalEl)?.show();
            } catch (error) {
                console.error("Error opening edit promotion modal:", error);
                showStatus(elements.promotionsStatus, `Error loading promotion for edit: ${error.message}`, "danger", false);
            } finally {
                showLoader(false);
            }
        }

        // Other modal functions (populateGameSelect, openEditTournamentModal, openUserModal, openRegisteredPlayersModal) remain largely the same as previous version

        async function populateGameSelect(selectedValue = null) { if (!elements.tournamentGameSelect) return; const select = elements.tournamentGameSelect; select.innerHTML = '<option value="">Loading...</option>'; select.disabled = true; try { if (Object.keys(gameDataCache).length === 0) await loadGames(); if (Object.keys(gameDataCache).length > 0) { select.innerHTML = '<option value="">-- Select Game --</option>'; const sorted = Object.entries(gameDataCache).sort(([, a], [, b]) => a.localeCompare(b)); sorted.forEach(([id, name]) => { const opt = document.createElement('option'); opt.value = id; opt.textContent = sanitizeHTML(name); select.appendChild(opt); }); if (selectedValue) select.value = selectedValue; } else { select.innerHTML = '<option value="">No Games Available</option>'; } } catch (error) { console.error("Error populating game select:", error); select.innerHTML = '<option value="">Error Loading</option>'; } finally { select.disabled = false; } }
        async function openEditTournamentModal(tournamentId) { if (!db || !tournamentId || !isDesignatedAdmin(currentAdminUser)) return; console.log("Opening edit tournament modal:", tournamentId); showLoader(true); clearStatus(elements.addTournamentStatus); elements.tournamentForm.reset(); currentEditingTournamentId = tournamentId; try { const snapshot = await get(ref(db, `tournaments/${tournamentId}`)); if (!snapshot.exists()) throw new Error(`Tournament ${tournamentId} not found.`); const t = snapshot.val(); await populateGameSelect(t.gameId); elements.tournamentModalTitle.textContent = "Edit Tournament"; elements.tournamentEditId.value = tournamentId; elements.tournamentNameInput.value = t.name || ''; if (t.startTime) { try { const d = new Date(t.startTime); if (!isNaN(d)) { const offset = d.getTimezoneOffset() * 60000; elements.tournamentStartTimeInput.value = new Date(d - offset).toISOString().slice(0, 16); } } catch(e){console.warn("Err fmt date",e);}} elements.tournamentStatusSelect.value = t.status || 'upcoming'; elements.tournamentEntryFeeInput.value = t.entryFee ?? 0; elements.tournamentPrizePoolInput.value = t.prizePool ?? 0; elements.tournamentPerKillInput.value = t.perKillPrize ?? 0; elements.tournamentMaxPlayersInput.value = t.maxPlayers ?? 0; elements.tournamentTagsInput.value = (t.tags || []).join(', '); if(elements.tournamentMapInput) elements.tournamentMapInput.value = t.map || ''; if(elements.tournamentModeInput) elements.tournamentModeInput.value = t.mode || ''; elements.tournamentDescriptionInput.value = t.description || ''; elements.tournamentRoomIdInput.value = t.roomId || ''; elements.tournamentRoomPasswordInput.value = t.roomPassword || ''; elements.tournamentShowIdPassCheckbox.checked = t.showIdPass || false; if(elements.tournamentBannerUrlInput) { elements.tournamentBannerUrlInput.value = t.bannerUrl || ''; const prev = getElement('bannerPreviewDiv'); const img = getElement('bannerPreviewImg'); if(prev && img && t.bannerUrl) { img.src = t.bannerUrl; prev.style.display='block'; } } getModalInstance(elements.addTournamentModalEl)?.show(); } catch (error) { console.error("Error opening edit tournament modal:", error); showStatus(elements.tournamentsStatus, `Error loading tournament: ${error.message}`, "danger", false); currentEditingTournamentId = null; } finally { showLoader(false); } }
        async function openUserModal(userId) { if (!db || !userId || !isDesignatedAdmin(currentAdminUser)) return; console.log("Opening user modal:", userId); showLoader(true); clearStatus(elements.balanceUpdateStatus); elements.updateBalanceForm.reset(); elements.userDetailReferredBy.textContent = "N/A"; elements.userDetailReferredCount.textContent = "N/A"; try { let user; if (fullUserDataCache[userId] && fullUserDataCache[userId].status !== 'error' && fullUserDataCache[userId].status !== 'deleted') { user = fullUserDataCache[userId]; console.log("Using cached user data."); } else { console.log("Fetching user data..."); const snapshot = await get(ref(db, `users/${userId}`)); if (!snapshot.exists()) throw new Error(`User ${userId} not found.`); user = snapshot.val(); user.uid = userId; fullUserDataCache[userId] = user; } elements.userModalTitle.textContent = `User: ${sanitizeHTML(user.displayName || 'N/A')}`; elements.userDetailUid.textContent = userId; elements.userDetailEmail.textContent = sanitizeHTML(user.email || 'N/A'); elements.userDetailName.textContent = sanitizeHTML(user.displayName || 'N/A'); elements.userDetailCreatedAt.textContent = formatDate(user.createdAt); elements.userDetailBalance.textContent = formatCurrency(user.balance); elements.userDetailWinning.textContent = formatCurrency(user.winningCash); elements.userDetailBonus.textContent = formatCurrency(user.bonusCash); elements.editUserUid.value = userId; elements.userDetailReferralCode.textContent = user.referralCode || 'N/A'; const status = user.status || 'active'; elements.userDetailStatus.textContent = status.charAt(0).toUpperCase() + status.slice(1); elements.userDetailStatus.className = `fw-bold text-${status === 'active' ? 'success' : 'danger'}`; elements.userBlockBtn.textContent = status === 'active' ? 'Block User' : 'Unblock User'; elements.userBlockBtn.className = `btn btn-sm ${status === 'active' ? 'btn-danger' : 'btn-success'}`; elements.userBlockBtn.dataset.id = userId; elements.userBlockBtn.dataset.action = status === 'active' ? 'block' : 'unblock'; elements.userDeleteBtn.dataset.id = userId; getModalInstance(elements.userModalEl)?.show(); } catch (error) { console.error("Error opening user modal:", error); showStatus(elements.usersStatus, `Error loading user: ${error.message}`, "danger", false); } finally { showLoader(false); } }
        async function openRegisteredPlayersModal(tournamentId, tournamentName) { if (!db || !tournamentId || !isDesignatedAdmin(currentAdminUser)) return; console.log(`Opening registered players: T:${tournamentId}`); elements.registeredPlayersModalTitle.textContent = "Registered Players"; elements.registeredPlayersTournamentName.textContent = tournamentName || "N/A"; elements.registeredPlayersTableBody.innerHTML = `<tr><td colspan="6" class="text-center p-3"><div class="spinner-border spinner-border-sm"></div></td></tr>`; clearStatus(elements.registeredPlayersStatus); getModalInstance(elements.registeredPlayersModalEl)?.show(); try { const playersRef = ref(db, `tournaments/${tournamentId}/registeredPlayers`); const snapshot = await get(playersRef); if (!snapshot.exists()) { elements.registeredPlayersTableBody.innerHTML = `<tr><td colspan="6" class="text-center p-3 text-muted">No players registered.</td></tr>`; return; } const registeredData = snapshot.val(); const userIds = Object.keys(registeredData); let tableHtml = ''; let fetchedCount = 0; const promises = userIds.map(async (uid) => { try { let u = fullUserDataCache[uid]; if (!u) { const uSnap = await get(ref(db, `users/${uid}`)); if (uSnap.exists()) { u = uSnap.val(); u.uid = uid; fullUserDataCache[uid] = u; } else u = { uid: uid, displayName: 'Not Found', email: 'N/A' }; } return { user: u, joinedAt: registeredData[uid]?.joinedAt }; } catch (err) { console.warn(`Err fetch user ${uid} for list:`, err); return { user: { uid: uid, displayName: 'Error Fetching', email: 'N/A' }, joinedAt: registeredData[uid]?.joinedAt }; } }); const results = await Promise.allSettled(promises); results.forEach(res => { if (res.status === 'fulfilled' && res.value) { const { user, joinedAt } = res.value; const inGameName = sanitizeHTML(registeredData[user.uid]?.inGameName || 'N/A'); const gameName = sanitizeHTML(registeredData[user.uid]?.gameName || 'N/A'); const emailDisplay = sanitizeHTML(registeredData[user.uid]?.email || user.email || 'N/A'); tableHtml += `<tr><td><small class="text-muted">${sanitizeHTML(user.uid)}</small></td><td>${sanitizeHTML(user.displayName)}</td><td>${emailDisplay}</td><td><span class="badge bg-info text-dark">${inGameName}</span></td><td>${gameName}</td><td>${formatDate(joinedAt)}</td></tr>`; fetchedCount++; } }); elements.registeredPlayersTableBody.innerHTML = tableHtml || `<tr><td colspan="6" class="text-center p-3 text-muted">Could not load player details.</td></tr>`; elements.registeredPlayersModalTitle.textContent = `Registered Players (${fetchedCount})`; } catch (error) { console.error("Error loading registered players:", error); elements.registeredPlayersTableBody.innerHTML = `<tr><td colspan="4" class="text-center p-3 text-danger">Error: ${error.message}.</td></tr>`; showStatus(elements.registeredPlayersStatus, `Error: ${error.message}`, 'danger'); } }


        // --- Event Listeners Initialization ---
        function initializeAdminEventListeners() {
            console.log("Initializing Admin Event Listeners...");
            if (!auth || !db) { console.error("Cannot init listeners: Firebase not ready."); return; }

            // Auth & Setup
            elements.adminSetupForm?.addEventListener('submit', setupAdmin);
            elements.adminLoginForm?.addEventListener('submit', loginAdmin);
            elements.adminLogoutBtn?.addEventListener('click', logoutAdminUser);
            // Sidebar Navigation
            elements.sidebarLinks?.forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); const sectionId = link.dataset.section; if (sectionId && !link.classList.contains('active')) { showAdminSection(sectionId); } else { getOffcanvasInstance(elements.sidebar)?.hide(); } }); });
            // Save Buttons (direct click)
            elements.saveGameBtn?.addEventListener('click', saveGame); // Handles Add/Edit
            elements.savePromotionBtn?.addEventListener('click', savePromotion); // Handles Add/Edit
            elements.saveTournamentBtn?.addEventListener('click', saveTournament);
            elements.saveNewUserBtn?.addEventListener('click', saveNewUser);
            // Form Submissions
            // ── Payment Method Toggle ──────────────────────────────
            function togglePaymentFields() {
                const isGateway = elements.pmGatewayRadio?.checked;
                if (elements.manualPaymentFields) elements.manualPaymentFields.style.display = isGateway ? 'none' : 'block';
                if (elements.gatewayPaymentFields) elements.gatewayPaymentFields.style.display = isGateway ? 'block' : 'none';
            }
            elements.pmManualRadio?.addEventListener('change', togglePaymentFields);
            elements.pmGatewayRadio?.addEventListener('change', togglePaymentFields);

            // ── QR Code ImgBB Upload ───────────────────────────────────
            elements.qrUploadInput?.addEventListener('change', async function() {
                const file = this.files[0];
                if (!file) return;
                const imgbbKey = appSettings.imgbbApiKey || elements.settingImgbbApiKey?.value?.trim() || '';
                if (!imgbbKey) { alert('ImgBB API Key set karein pehle Settings mein.'); return; }
                elements.qrUploadStatus.textContent = 'Uploading...';
                elements.qrUploadStatus.style.display = 'block';
                elements.qrUploadStatus.style.color = '#94A3B8';
                try {
                    const fd = new FormData();
                    fd.append('image', file);
                    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, { method: 'POST', body: fd });
                    const data = await res.json();
                    if (data.success) {
                        const url = data.data.url;
                        if (elements.settingPayQrUrl) elements.settingPayQrUrl.value = url;
                        if (elements.qrPreviewImg) elements.qrPreviewImg.src = url;
                        if (elements.qrPreviewDiv) elements.qrPreviewDiv.style.display = 'block';
                        elements.qrUploadStatus.textContent = '✅ QR uploaded!';
                        elements.qrUploadStatus.style.color = '#10D98B';
                    } else {
                        elements.qrUploadStatus.textContent = '❌ Upload failed: ' + (data.error?.message || 'Unknown error');
                        elements.qrUploadStatus.style.color = '#FF4D6A';
                    }
                } catch(e) {
                    elements.qrUploadStatus.textContent = '❌ ' + e.message;
                    elements.qrUploadStatus.style.color = '#FF4D6A';
                }
            });

            // ── Deposits Section ───────────────────────────────────────
            let currentDepositTab = 'pending';
            let currentDepositAction = { id: null, type: null, userId: null, amount: 0 };
            let depositsUnsubscribe = null;

            document.getElementById('depositTabs')?.addEventListener('click', function(e) {
                const btn = e.target.closest('[data-deposit-tab]');
                if (!btn) return;
                currentDepositTab = btn.dataset.depositTab;
                this.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                loadDeposits();
            });

            async function loadDeposits() {
                if (!db || !isDesignatedAdmin(currentAdminUser)) return;
                if (elements.depositsTableBody) elements.depositsTableBody.innerHTML = '<tr><td colspan="8" class="text-center py-4 text-muted"><span class="spinner-border spinner-border-sm me-2"></span>Loading...</td></tr>';
                try {
                    // Load all deposit requests (manual + ZapUPI gateway both stored here)
                    const manualSnap = await get(ref(db, 'depositRequests'));

                    let allDeposits = [];

                    // All deposits (manual + ZapUPI gateway) are in depositRequests
                    if (manualSnap.exists()) {
                        Object.entries(manualSnap.val()).forEach(([k, v]) => {
                            const gw = v.gateway || 'manual';
                            allDeposits.push({
                                id: k,
                                source: gw === 'zapupi' ? 'gateway' : 'manual',
                                userId: v.userId || '',
                                userName: v.userName || v.userEmail || 'Unknown',
                                amount: v.amount || 0,
                                txnId: v.txnId || v.transactionId || v.orderId || '',
                                utr: v.utr || '',
                                screenshotUrl: v.screenshotUrl || '',
                                status: v.status || 'pending',
                                gateway: gw,
                                ts: v.requestTimestamp || v.paidAt || v.timestamp || 0,
                                orderId: v.orderId || k,
                                rejectReason: v.rejectReason || ''
                            });
                        });
                    }

                    // Note: ZapUPI gateway deposits are stored in depositRequests (same as manual)
                    // No separate webhook node scan needed

                    // Filter by tab
                    // 'paid' = ZapUPI payment done, awaiting admin approval (same as pending)
                    const filtered = allDeposits.filter(d => {
                        if (currentDepositTab === 'pending') return d.status === 'pending' || d.status === 'paid';
                        if (currentDepositTab === 'approved') return d.status === 'approved' || d.status === 'completed' || d.status === 'success';
                        if (currentDepositTab === 'rejected') return d.status === 'rejected' || d.status === 'failed';
                        return true;
                    }).sort((a, b) => (b.ts || 0) - (a.ts || 0));

                    // Update pending badge (pending + paid both need action)
                    const pendingCount = allDeposits.filter(d => d.status === 'pending' || d.status === 'paid').length;
                    if (elements.depositPendingCount) elements.depositPendingCount.textContent = pendingCount;
                    if (elements.pendingDepositCountBadge) {
                        elements.pendingDepositCountBadge.textContent = pendingCount;
                        elements.pendingDepositCountBadge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
                    }

                    if (!filtered.length) {
                        elements.depositsTableBody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-muted">No ${currentDepositTab} deposits found.</td></tr>`;
                        return;
                    }

                    elements.depositsTableBody.innerHTML = filtered.map(d => {
                        const time = d.ts ? new Date(d.ts).toLocaleString('en-IN', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) : '—';
                        const statusBadge = d.status === 'pending'
                            ? '<span class="badge bg-warning text-dark">Pending</span>'
                            : d.status === 'paid'
                            ? '<span class="badge bg-info text-dark"><i class="bi bi-lightning-fill"></i> Paid - Verify</span>'
                            : (d.status === 'approved' || d.status === 'completed' || d.status === 'success')
                            ? '<span class="badge bg-success">Approved</span>'
                            : '<span class="badge bg-danger">Rejected</span>';
                        const screenshotCell = d.screenshotUrl
                            ? `<a href="${d.screenshotUrl}" target="_blank" class="btn btn-sm btn-outline-info py-0 px-1"><i class="bi bi-image"></i></a>`
                            : '<span class="text-muted">—</span>';
                        const actionBtn = d.status === 'pending'
                            ? `<button class="btn btn-sm btn-outline-warning py-0 px-2 deposit-action-btn"
                                data-id="${d.id}" data-source="${d.source}" data-uid="${d.userId}"
                                data-amount="${d.amount}" data-username="${(d.userName||'').replace(/"/g,'&quot;')}"
                                data-txnid="${(d.txnId||d.utr||'').replace(/"/g,'&quot;')}"
                                data-gateway="${d.gateway}"
                                data-screenshot="${(d.screenshotUrl||'').replace(/"/g,'&quot;')}">
                                <i class="bi bi-gear-fill"></i> Action</button>`
                            : '<span class="text-muted small">Done</span>';
                        return `<tr>
                            <td><small>${d.userName}<br><span class="text-muted" style="font-size:0.7rem;">${d.userId ? d.userId.slice(0,8)+'...' : '—'}</span></small></td>
                            <td class="fw-bold text-warning">&#8377;${parseFloat(d.amount).toFixed(2)}</td>
                            <td><small class="text-info">${d.txnId || d.utr || '—'}</small></td>
                            <td>${screenshotCell}</td>
                            <td><span class="badge bg-secondary">${d.gateway}</span></td>
                            <td><small>${time}</small></td>
                            <td>${statusBadge}</td>
                            <td>${actionBtn}</td>
                        </tr>`;
                    }).join('');
                } catch(e) {
                    console.error('loadDeposits error:', e);
                    if (elements.depositsTableBody) elements.depositsTableBody.innerHTML = `<tr><td colspan="8" class="text-center py-3 text-danger">Error: ${e.message}</td></tr>`;
                }
            }

            window.openDepositAction = function(id, source, userId, amount, userName, txnId, gateway, screenshotUrl) {
                currentDepositAction = { id, source, userId, amount, gateway };
                if (elements.depositDetailId) elements.depositDetailId.textContent = id;
                if (elements.depositDetailUser) elements.depositDetailUser.textContent = userName;
                if (elements.depositDetailUid) elements.depositDetailUid.textContent = userId;
                if (elements.depositDetailAmount) elements.depositDetailAmount.textContent = parseFloat(amount).toFixed(2);
                if (elements.depositDetailTxnId) elements.depositDetailTxnId.textContent = txnId || '—';
                if (elements.depositDetailMethod) elements.depositDetailMethod.textContent = gateway;
                if (elements.depositScreenshotDiv) {
                    elements.depositScreenshotDiv.style.display = screenshotUrl ? 'block' : 'none';
                    if (screenshotUrl) {
                        elements.depositScreenshotLink.href = screenshotUrl;
                        elements.depositScreenshotImg.src = screenshotUrl;
                    }
                }
                if (elements.depositRejectReasonDiv) elements.depositRejectReasonDiv.style.display = 'none';
                if (elements.depositRejectReason) elements.depositRejectReason.value = '';
                clearStatus(elements.depositActionStatus);
                getModalInstance(elements.depositActionModalEl)?.show();
            };

            // Event delegation for deposit action buttons (data-attribute based, safe for URLs)
            elements.depositsTableBody?.addEventListener('click', (e) => {
                const btn = e.target.closest('.deposit-action-btn');
                if (!btn) return;
                window.openDepositAction(
                    btn.dataset.id,
                    btn.dataset.source,
                    btn.dataset.uid,
                    parseFloat(btn.dataset.amount),
                    btn.dataset.username,
                    btn.dataset.txnid,
                    btn.dataset.gateway,
                    btn.dataset.screenshot
                );
            });

            async function processDepositAction(actionType) {
                if (!db || !isDesignatedAdmin(currentAdminUser) || !currentDepositAction.id) return;
                const { id, source, userId, amount, gateway } = currentDepositAction;
                const statusEl = elements.depositActionStatus;
                clearStatus(statusEl);

                if (actionType === 'reject') {
                    if (elements.depositRejectReasonDiv.style.display === 'none') {
                        elements.depositRejectReasonDiv.style.display = 'block';
                        showStatus(statusEl, 'Reason likhein phir Reject dabayein.', 'warning');
                        return;
                    }
                    const reason = elements.depositRejectReason.value.trim();
                    if (!reason) { showStatus(statusEl, 'Rejection reason required.', 'warning'); return; }
                }

                // Guard: check current status before processing
                try {
                    const currentSnap = await get(ref(db, `depositRequests/${id}/status`));
                    const currentStatus = currentSnap.val();
                    if (currentStatus === 'approved' || currentStatus === 'completed' || currentStatus === 'rejected') {
                        showStatus(statusEl, `Yeh request pehle se ${currentStatus} hai!`, 'warning', 3000);
                        return;
                    }
                } catch(e) { /* ignore and proceed */ }

                showLoader(true);
                elements.approveDepositBtn.disabled = true;
                elements.rejectDepositBtn.disabled = true;

                try {
                    const updates = {};
                    const newStatus = actionType === 'approve' ? 'approved' : 'rejected';

                    // Both manual and gateway deposits are in depositRequests node
                    updates[`depositRequests/${id}/status`] = newStatus;
                    updates[`depositRequests/${id}/processedAt`] = Date.now();
                    updates[`depositRequests/${id}/processedBy`] = currentAdminUser.uid;
                    if (actionType === 'reject') {
                        updates[`depositRequests/${id}/rejectReason`] = elements.depositRejectReason?.value.trim() || 'Rejected by admin';
                    }

                    if (actionType === 'approve' && userId) {
                        // Race-safe wallet credit via runTransaction
                        await runTransaction(ref(db, `users/${userId}`), (u) => {
                            if (u) {
                                u.balance = (Number(u.balance) || 0) + Number(amount);
                                u.totalDeposited = (Number(u.totalDeposited) || 0) + Number(amount);
                            }
                            return u;
                        });
                        // Get updated balance for transaction log
                        const userSnapAfter = await get(ref(db, `users/${userId}`));
                        const newBalance = userSnapAfter.exists() ? (Number(userSnapAfter.val().balance) || 0) : Number(amount);
                        const txKey = push(ref(db, `transactions/${userId}`)).key;
                        updates[`transactions/${userId}/${txKey}`] = {
                            type: 'deposit',
                            amount: Number(amount),
                            timestamp: Date.now(),
                            description: `💰 Wallet Top-Up ₹${amount} (${gateway}) — Admin Approved`,
                            status: 'completed',
                            balanceAfter: newBalance,
                            depositId: id,
                            adminUid: currentAdminUser.uid
                        };
                    }

                    await update(ref(db), updates);
                    showStatus(statusEl, actionType === 'approve' ? `✅ ₹${amount} credited!` : '❌ Request rejected.', actionType === 'approve' ? 'success' : 'warning', 2000);
                    setTimeout(() => {
                        getModalInstance(elements.depositActionModalEl)?.hide();
                        loadDeposits();
                        loadDashboardStats();
                    }, 1500);
                } catch(e) {
                    console.error('processDepositAction error:', e);
                    showStatus(statusEl, 'Error: ' + e.message, 'danger', false);
                } finally {
                    showLoader(false);
                    elements.approveDepositBtn.disabled = false;
                    elements.rejectDepositBtn.disabled = false;
                }
            }

            elements.approveDepositBtn?.addEventListener('click', () => processDepositAction('approve'));
            elements.rejectDepositBtn?.addEventListener('click', () => processDepositAction('reject'));

                        elements.appSettingsForm?.addEventListener('submit', saveSettings);
            elements.updateBalanceForm?.addEventListener('submit', updateUserBalance);
            // Modal Triggers / Actions in Modals
            elements.addNewGameBtn?.addEventListener('click', () => { // Open Add Game Modal
                 elements.gameForm?.reset(); elements.gameEditId.value = ''; elements.gameModalTitle.textContent = "Add New Game"; clearStatus(elements.gameStatus);
                 const imgbbEl = elements.gameForm?.querySelector('.imgbb-upload-status'); if(imgbbEl){ imgbbEl.textContent=''; imgbbEl.style.display='none';}
            });
             elements.addNewPromotionBtn?.addEventListener('click', () => { // Open Add Promotion Modal
                 elements.promotionForm?.reset(); elements.promotionEditId.value = ''; elements.promotionModalTitle.textContent = "Add New Promotion"; clearStatus(elements.promotionStatus);
                 const imgbbEl = elements.promotionForm?.querySelector('.imgbb-upload-status'); if(imgbbEl){ imgbbEl.textContent=''; imgbbEl.style.display='none';}
            });
            elements.addNewTournamentBtn?.addEventListener('click', () => { currentEditingTournamentId = null; elements.tournamentForm?.reset(); if(elements.tournamentModalTitle) elements.tournamentModalTitle.textContent = "Add New Tournament"; clearStatus(elements.addTournamentStatus); populateGameSelect(); const prev = getElement('bannerPreviewDiv'); if(prev) prev.style.display='none'; });
            // Banner URL live preview
            getElement('tournamentBannerUrl')?.addEventListener('input', (e) => {
                const url = e.target.value.trim();
                const prev = getElement('bannerPreviewDiv');
                const img = getElement('bannerPreviewImg');
                if(prev && img) { if(url) { img.src = url; prev.style.display='block'; } else { prev.style.display='none'; } }
            });
            elements.userBlockBtn?.addEventListener('click', toggleUserBlock);
            elements.userDeleteBtn?.addEventListener('click', (e) => { const userId = e.target.closest('button')?.dataset.id; if (userId) deleteUser(userId); });
            elements.approveWithdrawalBtn?.addEventListener('click', processWithdrawalAction);
            elements.rejectWithdrawalBtn?.addEventListener('click', processWithdrawalAction);
            // Demo Data
            elements.addDemoDataBtn?.addEventListener('click', addDemoData);
            // User Search
            elements.userSearchInput?.addEventListener('input', filterUsers);
            
            // =========================
            // NOTIFICATIONS EVENT LISTENERS
            // =========================
            elements.sendNotifBtn?.addEventListener('click', sendNotification);
            elements.saveWelcomeMsgBtn?.addEventListener('click', saveWelcomeMessage);
            elements.clearAllNotifsBtn?.addEventListener('click', clearAllNotifications);
            elements.saveAnnBtn?.addEventListener('click', saveAnnouncement);
            elements.clearAllAnnsBtn?.addEventListener('click', clearAllAnnouncements);
            // Announcements image file upload (reuse ImgBB pattern if needed)
            elements.annImageFile?.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                if (elements.annImgbbStatus) { elements.annImgbbStatus.style.display='block'; elements.annImgbbStatus.textContent='Uploading...'; }
                try {
                    const imgbbKey = appSettings?.imgbbApiKey;
                    if (!imgbbKey) { if(elements.annImgbbStatus){elements.annImgbbStatus.textContent='ImgBB API key not set in Settings.';} return; }
                    const fd = new FormData(); fd.append('image', file); fd.append('key', imgbbKey);
                    const resp = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: fd });
                    const data = await resp.json();
                    if (data.success) {
                        if(elements.annImageUrl) elements.annImageUrl.value = data.data.url;
                        if(elements.annImgbbStatus){elements.annImgbbStatus.textContent='Uploaded! ✓';}
                    } else { if(elements.annImgbbStatus){elements.annImgbbStatus.textContent='Upload failed.';} }
                } catch(err) { if(elements.annImgbbStatus){elements.annImgbbStatus.textContent='Upload error: '+err.message;} }
            });

            // Recipient radio toggle
            document.querySelectorAll('input[name="notifTarget"]').forEach(radio => {
                radio.addEventListener('change', () => {
                    const div = getElement('notifUserEmailDiv');
                    if (div) div.style.display = radio.value === 'single' && radio.checked ? 'block' : 'none';
                });
            });

            // Notif image file preview
            elements.notifImageFile?.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && elements.notifImagePreviewDiv && elements.notifImagePreview) {
                    const reader = new FileReader();
                    reader.onload = (ev) => { elements.notifImagePreview.src = ev.target.result; elements.notifImagePreviewDiv.style.display = 'block'; };
                    reader.readAsDataURL(file);
                }
            });
            // Notif image URL preview
            elements.notifImageUrl?.addEventListener('input', (e) => {
                const url = e.target.value.trim();
                if (url && elements.notifImagePreviewDiv && elements.notifImagePreview) {
                    elements.notifImagePreview.src = url; elements.notifImagePreviewDiv.style.display = 'block';
                } else if (elements.notifImagePreviewDiv) { elements.notifImagePreviewDiv.style.display = 'none'; }
            });

            // Delete single notif (delegated)
            elements.notifListContainer?.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn-delete-notif');
                if (btn) deleteNotification(btn.dataset.id);
            });

            // =========================
            // NEW: THEME EVENT LISTENERS
            // =========================
            elements.saveThemeBtn?.addEventListener('click', saveTheme);
            elements.resetThemeBtn?.addEventListener('click', resetTheme);
            elements.previewDefaultThemeBtn?.addEventListener('click', () => populateThemePickers(defaultTheme));
            elements.previewCrimsonThemeBtn?.addEventListener('click', () => populateThemePickers(crimsonTheme));
            elements.previewOceanicThemeBtn?.addEventListener('click', () => populateThemePickers(oceanicTheme));
            // Sync color picker with text input and vice-versa
            elements.customThemeForm?.addEventListener('input', (e) => {
                if (e.target.matches('input[type="color"]')) {
                    const textInput = e.target.parentElement.querySelector(`input[type="text"][data-target="${e.target.id}"]`);
                    if(textInput) textInput.value = e.target.value;
                } else if (e.target.matches('input[type="text"]')) {
                    const colorInput = getElement(e.target.dataset.target);
                    if(colorInput && /^#[0-9A-F]{6}$/i.test(e.target.value)) {
                        colorInput.value = e.target.value;
                    }
                }
            });
            
            // Delegated Event Listener for table actions and copy buttons
            document.body.addEventListener('click', (event) => {
                 const target = event.target; const actionButton = target.closest('button[data-id]'); const copyIcon = target.closest('.copy-btn[data-target]');

                 if (actionButton) {
                     const targetId = actionButton.dataset.id; if (!targetId) return;
                     if (actionButton.classList.contains('btn-delete-game')) deleteGame(targetId);
                     else if (actionButton.classList.contains('btn-edit-game')) openEditGameModal(targetId); // Added
                     else if (actionButton.classList.contains('btn-delete-promo')) deletePromotion(targetId);
                     else if (actionButton.classList.contains('btn-edit-promo')) openEditPromotionModal(targetId); // Added
                     else if (actionButton.classList.contains('btn-delete-tournament')) deleteTournament(targetId);
                     else if (actionButton.classList.contains('btn-edit-tournament')) openEditTournamentModal(targetId);
                     else if (actionButton.classList.contains('btn-view-user')) openUserModal(targetId);
                     else if (actionButton.classList.contains('btn-approve-withdrawal')) openWithdrawalActionModal(targetId, 'approve');
                     else if (actionButton.classList.contains('btn-reject-withdrawal')) openWithdrawalActionModal(targetId, 'reject');
                     else if (actionButton.classList.contains('btn-delete-user')) deleteUser(targetId);
                     else if (actionButton.classList.contains('btn-view-registered')) openRegisteredPlayersModal(targetId, actionButton.dataset.name);
                     return;
                 }
                 if (copyIcon) { copyToClipboard(copyIcon.dataset.target); return; }
            });
            // Modal Cleanup logic
             const resetModal = (modalEl, formEl, statusEl, idField = null, titleEl = null, defaultTitle = 'Add New Item', imgbbSel = '.imgbb-upload-status') => {
                  modalEl?.addEventListener('hidden.bs.modal', () => {
                       formEl?.reset(); if(statusEl) clearStatus(statusEl);
                       const imgbbStat = formEl?.querySelector(imgbbSel); if(imgbbStat) { imgbbStat.textContent=''; imgbbStat.style.display='none'; }
                       if (idField) idField.value = ''; // Clear edit ID
                       if (titleEl) titleEl.textContent = defaultTitle; // Reset title
                       if (modalEl === elements.addTournamentModalEl) currentEditingTournamentId = null;
                       if (modalEl === elements.userModalEl) elements.editUserUid.value = '';
                       if (modalEl === elements.withdrawalActionModalEl) currentWithdrawalAction = { id: null, type: null, userId: null };
                       currentEditingItemId = null; // Reset generic edit ID
                  });
             };
             resetModal(elements.gameModalEl, elements.gameForm, elements.gameStatus, elements.gameEditId, elements.gameModalTitle, 'Add New Game');
             resetModal(elements.promotionModalEl, elements.promotionForm, elements.promotionStatus, elements.promotionEditId, elements.promotionModalTitle, 'Add New Promotion');
             resetModal(elements.addTournamentModalEl, elements.tournamentForm, elements.addTournamentStatus, elements.tournamentEditId, elements.tournamentModalTitle, 'Add New Tournament', null);
             resetModal(elements.addUserModalEl, elements.addUserForm, elements.addUserStatus, null, null, '', null);
             resetModal(elements.userModalEl, elements.updateBalanceForm, elements.balanceUpdateStatus, elements.editUserUid, null, '', null);
             resetModal(elements.withdrawalActionModalEl, null, elements.withdrawalActionStatus, null, null, '', null);
             resetModal(elements.registeredPlayersModalEl, null, elements.registeredPlayersStatus, null, null, '', null);

             console.log("Admin Event Listeners Initialized.");
        }

        // --- Filter Users Function ---
        function filterUsers() {
            const searchTerm = elements.userSearchInput.value.toLowerCase().trim();
            const filteredUsers = Object.values(fullUserDataCache).filter(user =>
                user.displayName?.toLowerCase().includes(searchTerm) || user.email?.toLowerCase().includes(searchTerm)
            );
            renderUsersTable(filteredUsers);
        }

        // --- Initialization ---
        document.addEventListener('DOMContentLoaded', () => {
            console.log("Admin Panel DOM Loaded.");
            if (!app || !auth || !db) {
                console.error("DOM loaded, but Firebase services not initialized. Check config object.");
                // The error message should already be displayed by the catch block during initialization
                return;
            }
            initializeAdminEventListeners();
            onAuthStateChanged(auth, handleAdminAuthStateChange); // Main entry point
        });