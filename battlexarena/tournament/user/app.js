// Firebase Imports
        import {
            initializeApp
        } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
        import {
            getDatabase,
            ref,
            get,
            set,
            update,
            push,
            query,
            orderByChild,
            equalTo,
            onValue,
            runTransaction,
            off,
            limitToLast,
            serverTimestamp
        } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
        import {
            getAuth,
            GoogleAuthProvider,
            signInWithPopup,
            signOut,
            onAuthStateChanged,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            sendPasswordResetEmail
        } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";


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


        const currentAppVersion = "1.0.0"; // <<< Set your app's current version here
        let isUpdateRequired = false; // Flag to block app usage


        let app, db, auth;
        try {
             if (firebaseConfig.apiKey === "AIzaSyB_uCSen5vElscLJCxbInuOXzjXM7ghYuE" || firebaseConfig.projectId === "battlexarena-4b07a") {
                console.warn("Firebase config using placeholder values. Replace them with your actual project details.");
            }
            app = initializeApp(firebaseConfig);
            db = getDatabase(app);
            auth = getAuth(app);
            console.log("Firebase Initialized (check config if using placeholders)");
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            document.body.innerHTML = `<div class="alert alert-danger m-5 position-fixed top-0 start-0 end-0" style="z-index: 10000;">Critical Error: Could not connect. Check Firebase config & console. Error: ${error.message}</div>`;
        }

        const getElement = (id) => document.getElementById(id);
        const querySel = (selector) => document.querySelector(selector);
        const querySelAll = (selector) => document.querySelectorAll(selector);
        const elements = {
            sections: querySelAll('.section'),
            bottomNavItems: querySelAll('.bottom-nav .nav-item[data-section]'),
            globalLoader: getElement('globalLoaderEl'), // Adjusted bottomNavItems selector
            headerBackBtn: getElement('headerBackBtnEl'),
            headerTitleContainer: getElement('headerTitleContainerEl'),
            headerGameTitle: getElement('headerGameTitleEl'),
            headerWalletChip: getElement('headerWalletChipEl'),
            headerChipBalance: getElement('headerChipBalanceEl'),
            headerUserGreeting: getElement('headerUserGreetingEl'),
            appLogo: getElement('appLogoEl'),
            notificationBtn: getElement('notificationBtnEl'),
            notificationBadge: querySel('.notification-badge'),
            loginSection: getElement('login-section'),
            emailLoginForm: getElement('emailLoginForm'),
            loginEmailInput: getElement('loginEmailInputEl'),
            loginPasswordInput: getElement('loginPasswordInputEl'),
            loginEmailBtn: getElement('loginEmailBtnEl'),
            showSignupToggleBtn: getElement('showSignupToggleBtnEl'),
            loginStatusMessage: getElement('loginStatusMessageEl'),
            forgotPasswordLink: getElement('forgotPasswordLinkEl'),
            emailSignupForm: getElement('emailSignupForm'),
            signupEmailInput: getElement('signupEmailInputEl'),
            signupPasswordInput: getElement('signupPasswordInputEl'),
            signupConfirmPasswordInput: getElement('signupConfirmPasswordInputEl'),
            signupReferralCodeInput: getElement('signupReferralCodeInputEl'),
            signupEmailBtn: getElement('signupEmailBtnEl'),
            showLoginToggleBtn: getElement('showLoginToggleBtnEl'),
            signupStatusMessage: getElement('signupStatusMessageEl'),
            // ADDED: Signup User Name
            signupUserNameInput: getElement('signupUserNameInputEl'),

            homeSection: getElement('home-section'),
            promotionSlider: getElement('promotionSliderEl'),
            gamesList: getElement('gamesListEl'),
            // My Contests - New elements for buttons
            myContestNavCards: querySelAll('#myContestNavCardsEl .my-contest-nav-card'),
            myUpcomingCount: getElement('myUpcomingCount'),
            myOngoingCount: getElement('myOngoingCount'),
            myCompletedCount: getElement('myCompletedCount'),

            tournamentsSection: getElement('tournaments-section'),
            tournamentsListContainer: getElement('tournamentsListContainerEl'),
            noTournamentsMessage: getElement('noTournamentsMessageEl'),
            tournamentTabs: querySelAll('.tournament-tabs .tab-item'),
            // MODIFIED: Wallet elements for new design
            walletSection: getElement('wallet-section'),
            walletTotalBalance: getElement('walletTotalBalanceEl'), // This is now the main large balance display
            walletDepositedAmount: getElement('walletDepositedAmountEl'), // New element for "Deposited" summary
            walletWinningCash: getElement('walletWinningCashEl'),
            walletBonusCash: getElement('walletBonusCashEl'),
            allTransactionsBtn: getElement('allTransactionsBtnEl'), // Now a general action button
            withdrawBtn: getElement('withdrawBtnEl'), // Now a general action button
            addAmountWalletBtn: getElement('addAmountWalletBtnEl'), // Now a general action button
            recentTransactionsList: getElement('recentTransactionsListEl'),
            noTransactionsMessage: getElement('noTransactionsMessageEl'),

            earningsSection: getElement('earnings-section'),
            earningsTotal: getElement('earningsTotalEl'),
            earningsWinning: getElement('earningsWinningEl'),
            earningsBonus: getElement('earningsBonusEl'),
            earningsReferral: getElement('earningsReferralEl'),
            viewEarningsHistoryBtn: getElement('viewEarningsHistoryBtn'),
            bonusHistoryModalEl: getElement('bonusHistoryModalEl'),
            bonusHistoryList: getElement('bonusHistoryListEl'),
            profileSection: getElement('profile-section'),
            profileAvatar: getElement('profileAvatarEl'),
            profileName: getElement('profileNameEl'),
            profileEmail: getElement('profileEmailEl'),
            profileTotalMatches: getElement('profileTotalMatchesEl'),
            profileWonMatches: getElement('profileWonMatchesEl'),
            profileTotalEarnings: getElement('profileTotalEarningsEl'),
            logoutProfileBtn: getElement('logoutProfileBtnEl'),
            policyLinks: querySelAll('.profile-links a[data-policy]'),
            notificationSwitch: getElement('notificationSwitchEl'), // Changed to only links for policy, buttons are handled separately
            policyModalInstance: getElement('policyModalEl') ? new bootstrap.Modal(getElement('policyModalEl')) : null,
            policyModalTitle: getElement('policyModalTitleEl'),
            policyModalBody: getElement('policyModalBodyEl'),
            addAmountModalEl: getElement('addAmountModalEl'),
            addAmountModalInstance: getElement('addAmountModalEl') ? new bootstrap.Modal(getElement('addAmountModalEl')) : null,
            modalUserEmail: getElement('modalUserEmailEl'),
            // ZapUPI Payment elements
            addAmountInput: getElement('addAmountInput'),
            verifyPaymentBtn: getElement('verifyPaymentBtnEl'),
            paymentStatus: getElement('paymentStatusEl'),
            withdrawModalInstance: getElement('withdrawModalEl') ? new bootstrap.Modal(getElement('withdrawModalEl')) : null,
            withdrawModalBalance: getElement('withdrawModalBalanceEl'),
            withdrawAmountInput: getElement('withdrawAmountInputEl'),
            withdrawMethodInput: getElement('withdrawMethodInputEl'),
            minWithdrawAmount: getElement('minWithdrawAmountEl'),
            withdrawStatusMessage: getElement('withdrawStatusMessageEl'),
            submitWithdrawRequestBtn: getElement('submitWithdrawRequestBtnEl'),
            matchDetailsModalInstance: getElement('matchDetailsModalEl') ? new bootstrap.Modal(getElement('matchDetailsModalEl')) : null,
            matchDetailsModalTitle: getElement('matchDetailsModalTitleEl'),
            matchDetailsModalBody: getElement('matchDetailsModalBodyEl'),
            idPasswordModalEl: getElement('idPasswordModalEl'),
            idPasswordModalInstance: getElement('idPasswordModalEl') ? new bootstrap.Modal(getElement('idPasswordModalEl')) : null,
            roomIdDisplay: getElement('roomIdDisplayEl'),
            roomPasswordDisplay: getElement('roomPasswordDisplayEl'),
            securityWarning: getElement('securityWarning'),
            bottomNavContactBtn: getElement('bottomNavContactBtnEl'),

            // ADDED: In-Game Name Modal elements
            inGameNameModalEl: getElement('inGameNameModalEl'),
            inGameNameModalInstance: getElement('inGameNameModalEl') ? new bootstrap.Modal(getElement('inGameNameModalEl')) : null,
            inGameNameInput: getElement('inGameNameInputEl'),
            confirmInGameNameBtn: getElement('confirmInGameNameBtnEl'),
            inGameNameStatusMessage: getElement('inGameNameStatusMessageEl'),

            // ADDED: Notice bar elements


            // NEW: Update Screen elements
            updateScreen: getElement('updateScreenEl'),
            updateNowBtn: getElement('updateNowBtnEl'),
            updateLaterBtn: getElement('updateLaterBtnEl'),
            currentVersionDisplay: getElement('currentVersionDisplay'),
            latestVersionDisplay: getElement('latestVersionDisplay'),
            whatsNewList: getElement('whatsNewListEl'),

            // Transaction History Modal
            allTransactionsModalEl: getElement('allTransactionsModalEl'),
            allTransactionsModalInstance: getElement('allTransactionsModalEl') ? new bootstrap.Modal(getElement('allTransactionsModalEl')) : null,
            allTransactionsList: getElement('allTransactionsListEl'),
            txnCountLabel: getElement('txnCountLabelEl'),
            // Notifications
            notificationsSection: getElement('notifications-section'),
            notificationsList: getElement('notificationsListEl'),
            markAllReadBtn: getElement('markAllReadBtn'),
            // Announcements
            announcementsSection: getElement('announcements-section'),
            announcementsList: getElement('announcementsListEl'),
            annTickerBar: getElement('announcementTickerBar'),
            annTickerText: getElement('annTickerTextEl'),

            // NEW: Tournament User Results Modal elements
            tournamentUserResultsModalEl: getElement('tournamentUserResultsModalEl'),
            tournamentUserResultsModalInstance: getElement('tournamentUserResultsModalEl') ? new bootstrap.Modal(getElement('tournamentUserResultsModalEl')) : null,
            tournamentUserResultsModalTitle: getElement('tournamentUserResultsModalTitle'),
            resultsModalTournamentName: getElement('resultsModalTournamentName'),
            resultsModalTournamentId: getElement('resultsModalTournamentId'),
            tournamentUserResultsTableBody: getElement('tournamentUserResultsTableBody'),
            tournamentUserResultsStatus: getElement('tournamentUserResultsStatus'),
        };

        let currentUser = null;
        let userProfile = {};
        let currentSectionId = 'login-section';
        let dbListeners = {};
        let swiperInstance;
        let currentTournamentGameId = null; // Used when currentTournamentsView is 'game'
        let currentTournamentsView = 'all'; // 'all' or 'my'
        let appSettings = {};
        let validReferrerUid = null;
        let currentTournamentListenerKey = null; // For tournament list real-time listener
        // ZapUPI gateway vars (timer removed - no longer needed)
        let addAmountTimerInterval = null; // kept for safety

        // Variables to store tournament data temporarily before showing In-Game Name modal
        let pendingJoinTournamentId = null;
        let pendingJoinTournamentFee = null;

        // FIX: Declare fullUserDataCache
        let fullUserDataCache = {};

        const formatCurrency = (amount) => `₹${(Number(amount) || 0).toFixed(2)}`;

        const showLoader = (show) => {
            if (elements.globalLoader) elements.globalLoader.style.display = show ? 'flex' : 'none';
        };

        function showStatusMessage(element, message, type = 'danger', autohide = true) {
            if (!element) return;
            element.innerHTML = message;
            element.className = `alert alert-${type} mt-3`;
            element.style.display = 'none'; // Hide by default
            if (message) element.style.display = 'block'; // Show if message is not empty
            element.setAttribute('role', 'alert');
            if (autohide) {
                setTimeout(() => {
                    if (element.innerHTML === message) element.style.display = 'none';
                }, 5000);
            }
        }

        function clearStatusMessage(element) {
            if (!element) return;
            element.style.display = 'none';
            element.innerHTML = '';
            element.removeAttribute('role');
        }

        function copyToClipboard(targetSelector) {
            if (!targetSelector) {
                alert('Copy target not defined.');
                return;
            }
            const targetElement = querySel(targetSelector);
            if (!targetElement) {
                alert('Element to copy from not found.');
                return;
            }
            const textToCopy = targetElement.textContent.trim(); // Ensure trim() to remove whitespace

            console.log("Attempting to copy:", targetSelector, "Text:", textToCopy); // Added for debugging

            if (!textToCopy || textToCopy === 'N/A' || textToCopy.includes('placeholder')) {
                alert('Nothing to copy (text not available or is placeholder).'); // More descriptive message
                return;
            }
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(() => alert('Copied!')).catch(err => {
                    console.error('Failed to copy (clipboard API):', err);
                    alert('Failed to copy. Try again.');
                });
            } else { // Fallback for older browsers or insecure contexts
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed"; // Avoid scrolling to bottom
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    alert('Copied! (fallback)');
                } catch (err) {
                    console.error('Failed to copy (execCommand):', err);
                    alert('Failed to copy. Your browser may not support this feature.');
                }
                document.body.removeChild(textArea);
            }
        }

        function shareReferral(code) {
            if (!navigator.share) {
                alert('Web Share not supported. Copy the code manually.');
                return;
            }
            if (!code || code === 'N/A') {
                alert('Referral code not available.');
                return;
            }
            navigator.share({
                title: 'Join Me on Gaming Tournament!',
                text: `Join using my referral code: ${code} & get rewards! App: ${window.location.origin}`,
                url: window.location.origin
            }).catch((error) => console.log('Error sharing', error));
        }

        function generateReferralCode(length = 8) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
            return result;
        }

        function getTimeRemaining(startTime) {
            if (!startTime) return 'TBA';
            const now = Date.now();
            const diff = startTime - now;
            if (diff <= 0) return 'Starting Soon';
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            let o = '';
            if (days > 0) o += `${days}d `;
            if (hours > 0 || days > 0) o += `${hours}h `;
            o += `${minutes}m`;
            return o.trim() || 'Now';
        }
        const removePlaceholders = (parentElement) => {
            if (!parentElement) return;
            parentElement.classList.remove('placeholder-glow');
            parentElement.querySelectorAll('.placeholder').forEach(el => el.remove());
        };

        // FIX: Add sanitizeHTML function to prevent XSS
        function sanitizeHTML(str) {
            const temp = document.createElement('div');
            temp.textContent = str;
            return temp.innerHTML;
        }

        function showSection(sectionId) {
            if (!auth || !sectionId || !elements.sections) {
                console.error("Cannot show section", sectionId);
                return;
            }

            // NEW: If a mandatory update is required, do not allow navigation to any other section
            if (isUpdateRequired) {
                console.log("Mandatory update required. Blocking section change.");
                if (elements.updateScreen) elements.updateScreen.style.display = 'flex'; // Ensure update screen is visible
                return; // Prevent showing any other section
            }

            const targetSection = getElement(sectionId);
            if (!targetSection) {
                console.error(`Section element "${sectionId}" not found.`);
                showSection(currentUser ? 'home-section' : 'login-section');
                return;
            }
            const protectedSections = ['home-section', 'wallet-section', 'earnings-section', 'profile-section', 'tournaments-section'];
            const isLoggedIn = !!currentUser;
            if (protectedSections.includes(sectionId) && !isLoggedIn) {
                showSection('login-section');
                return;
            }
            if (sectionId === 'login-section' && isLoggedIn) {
                showSection('home-section');
                return;
            }

            // Detach tournament listener if navigating away from tournaments-section
            if (currentSectionId === 'tournaments-section' && sectionId !== 'tournaments-section') {
                if (currentTournamentListenerKey && dbListeners[currentTournamentListenerKey]) {
                    const {
                        func,
                        queryObj
                    } = dbListeners[currentTournamentListenerKey];
                    if (queryObj && func) {
                        off(queryObj, 'value', func);
                        console.log("Detached tournament listener due to section change:", currentTournamentListenerKey);
                    } else {
                        console.warn("Could not detach tournament listener: queryObj or func missing for", currentTournamentListenerKey);
                    }
                    delete dbListeners[currentTournamentListenerKey];
                    currentTournamentListenerKey = null;
                }
            }

            elements.sections.forEach(sec => sec.classList.remove('active'));
            targetSection.classList.add('active');
            currentSectionId = sectionId;
            updateHeaderForSection(sectionId);
            // Ticker only on home
            if (sectionId !== 'home-section') {
                if (elements.annTickerBar) elements.annTickerBar.style.display = 'none';
                document.body.classList.remove('has-ann-ticker');
            } else {
                // Re-show ticker on home if it has content
                if (elements.annTickerBar && elements.annTickerBar.dataset.hasContent === 'true') {
                    elements.annTickerBar.style.display = 'flex';
                    document.body.classList.add('has-ann-ticker');
                }
            }
            elements.bottomNavItems.forEach(item => item.classList.toggle('active', item.dataset.section === sectionId)); // This targets only items with data-section
            console.log(`Loading data for section: ${sectionId}`);
            switch (sectionId) {
                case 'home-section':
                    loadHomePageData();
                    break;
                case 'wallet-section':
                    loadWalletData();
                    break;
                case 'profile-section':
                    loadProfileData();
                    break;
                case 'earnings-section':
                    loadEarningsData();
                    break;
                case 'notifications-section':
                    loadUserNotifications();
                    break;
                case 'announcements-section':
                    loadAnnouncements();
                    break;
                case 'tournaments-section':
                    // Decide which tab to activate based on the last action (game click or my contests click)
                    let initialTabStatus = 'upcoming'; // Default tab
                    // If we came from a 'my contest' button, the status was already selected.
                    // Otherwise, activate 'upcoming' if we are in 'all' view.
                    const activeTab = querySel('.tournament-tabs .tab-item.active');
                    if (activeTab) {
                        initialTabStatus = activeTab.dataset.status;
                    } else { // No active tab found, default to upcoming
                        querySel('.tournament-tabs .tab-item[data-status="upcoming"]')?.classList.add('active');
                    }
                    filterTournaments(initialTabStatus); // Now passes only status, mode is global
                    break;
            }
            if (sectionId === 'login-section') {
                toggleLoginForm(true);
            }
            window.scrollTo(0, 0);
        }

        function updateHeaderForSection(sectionId) {
            const showBackButton = (sectionId === 'tournaments-section');
            const defaultTitleVisible = !showBackButton;
            const gameTitleVisible = showBackButton;
            if (elements.headerBackBtn) elements.headerBackBtn.style.display = showBackButton ? 'inline-block' : 'none';
            if (elements.headerTitleContainer) elements.headerTitleContainer.style.display = defaultTitleVisible ? 'flex' : 'none';
            if (elements.headerGameTitle) elements.headerGameTitle.style.display = gameTitleVisible ? 'block' : 'none';
            if (gameTitleVisible && elements.headerGameTitle) {
                if (currentTournamentsView === 'my') {
                    elements.headerGameTitle.textContent = "My Contests";
                } else if (currentTournamentGameId) {
                    const gameName = appSettings?.games?.[currentTournamentGameId]?.name || `Game`;
                    elements.headerGameTitle.textContent = gameName;
                } else {
                    elements.headerGameTitle.textContent = "Tournaments"; // Fallback
                }
            } else if (defaultTitleVisible && elements.headerUserGreeting) {
                const nameToShow = userProfile?.displayName?.split(' ')[0] || (currentUser ? currentUser.email?.split('@')[0] : 'Guest') || 'Guest';
                elements.headerUserGreeting.textContent = nameToShow;
            }
        }

        function updateGlobalUI(isLoggedIn) {
            if (elements.headerWalletChip) {
                elements.headerWalletChip.style.display = isLoggedIn ? 'flex' : 'none';
                if (isLoggedIn) elements.headerWalletChip.onclick = () => showSection('wallet-section');
                else elements.headerWalletChip.onclick = null;
            }
            if (!isLoggedIn && elements.headerUserGreeting) elements.headerUserGreeting.textContent = 'Guest';
            if (!isLoggedIn && elements.headerChipBalance) elements.headerChipBalance.textContent = '0';

            elements.bottomNavItems.forEach(item => { // This targets only items with data-section
                const section = item.dataset.section;
                item.style.display = (section === 'home-section' || isLoggedIn) ? 'flex' : 'none';
            });
            if (elements.bottomNavContactBtn) { // Handle  button visibility separately
                elements.bottomNavContactBtn.style.display = isLoggedIn ? 'flex' : 'none';
            }
        }

        function populateUserInfo(user, profile) {
            if (!user || !profile) return;
            // Use userProfile.displayName from DB first, fallback to Firebase Auth displayName, then the value from signupUserNameInput.
            const displayName = profile.displayName || user.displayName || user.email?.split('@')[0] || 'User';
            const photoURL = profile.photoURL || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0F172A&color=E2E8F0&bold=true&size=70`;
            const balance = (profile.balance || 0);
            const winningCash = (profile.winningCash || 0);
            const bonusCash = (profile.bonusCash || 0);
            const totalEarnings = (profile.totalEarnings || 0);
            const referralEarnings = (profile.referralEarnings || 0);
            const totalMatches = profile.totalMatches || 0;
            const wonMatches = profile.wonMatches || 0;
            if (elements.headerUserGreeting) elements.headerUserGreeting.textContent = displayName.split(' ')[0];
            if (elements.headerChipBalance) elements.headerChipBalance.textContent = Math.floor(balance);

            // NEW: Wallet section population
            if (elements.walletTotalBalance) {
                elements.walletTotalBalance.textContent = formatCurrency(balance);
                removePlaceholders(elements.walletTotalBalance.closest('.placeholder-glow'));
            }
            if (elements.walletDepositedAmount) {
                elements.walletDepositedAmount.textContent = formatCurrency(profile.totalDeposited || 0);
                removePlaceholders(elements.walletDepositedAmount.closest('.placeholder-glow'));
            } // Show actual totalDeposited
            if (elements.walletWinningCash) {
                elements.walletWinningCash.textContent = formatCurrency(winningCash);
                removePlaceholders(elements.walletWinningCash.closest('.placeholder-glow'));
            }
            if (elements.walletBonusCash) {
                elements.walletBonusCash.textContent = formatCurrency(bonusCash);
                removePlaceholders(elements.walletBonusCash.closest('.placeholder-glow'));
            }
            // END NEW Wallet section population

            if (elements.withdrawModalBalance) elements.withdrawModalBalance.textContent = formatCurrency(winningCash);
            if (elements.profileAvatar) elements.profileAvatar.src = photoURL;
            if (elements.profileName) {
                elements.profileName.textContent = displayName;
                removePlaceholders(elements.profileName.closest('.placeholder-glow'));
            }
            if (elements.profileEmail) {
                elements.profileEmail.textContent = user.email || 'N/A';
                removePlaceholders(elements.profileEmail.closest('.placeholder-glow'));
            }
            if (elements.profileTotalMatches) {
                elements.profileTotalMatches.textContent = totalMatches;
                removePlaceholders(elements.profileTotalMatches.closest('.placeholder-glow'));
            }
            if (elements.profileWonMatches) {
                elements.profileWonMatches.textContent = wonMatches;
                removePlaceholders(elements.profileWonMatches.closest('.placeholder-glow'));
            }
            if (elements.profileTotalEarnings) {
                elements.profileTotalEarnings.textContent = formatCurrency(totalEarnings);
                removePlaceholders(elements.profileTotalEarnings.closest('.placeholder-glow'));
            }
            if (elements.earningsTotal) {
                elements.earningsTotal.textContent = formatCurrency(winningCash + bonusCash);
                removePlaceholders(elements.earningsTotal.closest('.placeholder-glow'));
            }
            if (elements.earningsWinning) {
                elements.earningsWinning.textContent = formatCurrency(winningCash);
                removePlaceholders(elements.earningsWinning.closest('.placeholder-glow'));
            }
            if (elements.earningsBonus) {
                elements.earningsBonus.textContent = formatCurrency(bonusCash);
                removePlaceholders(elements.earningsBonus.closest('.placeholder-glow'));
            }
            if (elements.earningsReferral) {
                elements.earningsReferral.textContent = formatCurrency(referralEarnings);
                removePlaceholders(elements.earningsReferral.closest('.placeholder-glow'));
            }
            if (elements.modalUserEmail) elements.modalUserEmail.textContent = user.email || 'N/A';
        }

        function toggleLoginForm(showLogin) {
            if (!elements.emailLoginForm || !elements.emailSignupForm) return;
            clearStatusMessage(elements.loginStatusMessage);
            clearStatusMessage(elements.signupStatusMessage);
            elements.emailLoginForm.style.display = showLogin ? 'block' : 'none';
            elements.emailSignupForm.style.display = showLogin ? 'none' : 'block';
            elements.emailLoginForm.reset();
            elements.emailSignupForm.reset();
        }

        async function signUpWithEmail() {
            if (!auth) return;
            const em = elements.signupEmailInput.value.trim();
            const userName = elements.signupUserNameInput.value.trim(); // ADDED: Get User Name
            const pw = elements.signupPasswordInput.value;
            const cpw = elements.signupConfirmPasswordInput.value;
            const refCode = elements.signupReferralCodeInput.value.trim();

            if (!em || !userName || !pw || !cpw) {
                showStatusMessage(elements.signupStatusMessage, 'Fill all required fields (Email, User Name, Password).', 'warning');
                return;
            } // MODIFIED: Validation message
            if (pw !== cpw) {
                showStatusMessage(elements.signupStatusMessage, 'Passwords don\'t match.', 'warning');
                return;
            }
            if (pw.length < 6) {
                showStatusMessage(elements.signupStatusMessage, 'Password min 6 chars.', 'warning');
                return;
            }

            showLoader(true);
            clearStatusMessage(elements.signupStatusMessage);
            validReferrerUid = null;

            try {
                if (refCode) {
                    console.log("Validating referral code:", refCode);
                    const usersRef = ref(db, 'users');
                    const q = query(usersRef, orderByChild('referralCode'), equalTo(refCode));
                    const snapshot = await get(q);
                    if (snapshot.exists()) {
                        const referrerData = snapshot.val();
                        const referrerId = Object.keys(referrerData)[0];
                        const referrerProfile = referrerData[referrerId];
                        if (referrerId && referrerProfile.email) {
                            validReferrerUid = referrerId;
                            console.log("Valid referrer found:", validReferrerUid);
                        } else {
                            console.warn("Referral code found, but referrer data invalid:", referrerData);
                        }
                    } else {
                        console.log("Referral code not found:", refCode);
                    }
                }
                const userCredential = await createUserWithEmailAndPassword(auth, em, pw);
                // Immediately update displayName after creation if Firebase allows (often requires a separate call)
                // Or, ensure it's set in the initial user profile in DB which is handled below
                // await updateProfile(userCredential.user, { displayName: userName }); // This line is not needed if setting in DB directly below

            } catch (e) {
                console.error("Signup Error:", e);
                let m = `Signup failed.`;
                switch (e.code) {
                    case 'auth/email-already-in-use':
                        m = 'Email already registered.';
                        break;
                    case 'auth/weak-password':
                        m = 'Password too weak.';
                        break;
                    case 'auth/invalid-email':
                        m = 'Invalid email.';
                        break;
                    case 'auth/network-request-failed':
                        m = 'Network error.';
                        break;
                    default:
                        m = `Error: ${e.message}`;
                }
                showStatusMessage(elements.signupStatusMessage, m, 'danger');
            } finally {
                showLoader(false);
            }
        }
        async function loginWithEmail() {
            if (!auth) return;
            const em = elements.loginEmailInput.value.trim();
            const pw = elements.loginPasswordInput.value;
            if (!em || !pw) {
                showStatusMessage(elements.loginStatusMessage, 'Enter email & password.', 'warning');
                return;
            }
            showLoader(true);
            clearStatusMessage(elements.loginStatusMessage);
            try {
                await signInWithEmailAndPassword(auth, em, pw);
            } catch (e) {
                console.error("Login Error:", e);
                let m = `Login failed.`;
                switch (e.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/invalid-credential':
                        m = 'Invalid email or password.';
                        break;
                    case 'auth/invalid-email':
                        m = 'Invalid email format.';
                        break;
                    case 'auth/too-many-requests':
                        m = 'Too many attempts. Reset pass or wait.';
                        break;
                    case 'auth/network-request-failed':
                        m = 'Network error.';
                        break;
                    default:
                        m = `Error: ${e.message}`;
                }
                showStatusMessage(elements.loginStatusMessage, m, 'danger');
            } finally {
                showLoader(false);
            }
        }
        async function resetPassword() {
            if (!auth) return;
            const em = elements.loginEmailInput.value.trim();
            if (!em) {
                showStatusMessage(elements.loginStatusMessage, 'Enter email for password reset.', 'warning');
                return;
            }
            showLoader(true);
            clearStatusMessage(elements.loginStatusMessage);
            try {
                await sendPasswordResetEmail(auth, em);
                showStatusMessage(elements.loginStatusMessage, 'Password reset email sent! Check inbox/spam.', 'success', false);
            } catch (e) {
                console.error("Reset Pass Error:", e);
                let m = `Failed to send email.`;
                switch (e.code) {
                    case 'auth/user-not-found':
                    case 'auth/invalid-email':
                        m = 'Email not found.';
                        break;
                    case 'auth/network-request-failed':
                        m = 'Network error.';
                        break;
                    default:
                        m = `Error: ${e.message}`;
                }
                showStatusMessage(elements.loginStatusMessage, m, 'danger');
            } finally {
                showLoader(false);
            }
        }
        async function logoutUser() {
            if (!auth) return;
            try {
                showLoader(true);
                await signOut(auth);
            } catch (e) {
                console.error("Sign Out Error:", e);
                alert(`Logout failed: ${e.message}`);
                showLoader(false);
            }
        }

        async function handleAuthStateChange(user) {
            // NEW: If a mandatory update is required, do not proceed with normal auth state flow
            if (isUpdateRequired) {
                console.log("Auth state change detected, but update is blocking. Skipping normal flow.");
                showLoader(false);
                return;
            }

            if (!auth || !db) {
                console.error("Firebase not ready in auth change");
                showLoader(false);
                return;
            }
            showLoader(true);
            detachAllDbListeners();
            currentUser = user;
            const localReferrerUid = validReferrerUid;
            validReferrerUid = null;

            if (user) {
                console.log("Auth State: Logged In", user.uid);
                const userRef = ref(db, 'users/' + user.uid);
                try {
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        userProfile = snapshot.val();
                        const updates = {};
                        // Priority: DB displayName > signupUserNameInput > Firebase Auth displayName
                        // Only update if DB has no displayName
                        const userNameFromSignup = elements.signupUserNameInput?.value?.trim();
                        if (!userProfile.displayName) {
                            if (userNameFromSignup) {
                                updates.displayName = userNameFromSignup;
                            } else if (user.displayName) {
                                updates.displayName = user.displayName;
                            }
                        }

                        if (user.email && !userProfile.email) updates.email = user.email;
                        if (Object.keys(updates).length > 0) {
                            await update(userRef, updates);
                            userProfile = {
                                ...userProfile,
                                ...updates
                            };
                        }
                    } else {
                        console.log("New user, creating profile...");
                        const newUserProfile = {
                            uid: user.uid,
                            // Use the User Name from the signup form if available, otherwise Firebase displayName, then derive from email
                            displayName: elements.signupUserNameInput?.value?.trim() || user.displayName || user.email?.split('@')[0] || 'User', // MODIFIED: Get User Name from signup form
                            email: user.email || null,
                            photoURL: user.photoURL || null,
                            balance: (appSettings.signupBonus || appSettings.newUserBalance || 0),
                            winningCash: 0,
                            bonusCash: (appSettings.signupBonus || appSettings.newUserBonus || 0),
                            totalMatches: 0,
                            wonMatches: 0,
                            totalEarnings: 0,
                            referralEarnings: 0,
                            createdAt: Date.now(),
                            referralCode: generateReferralCode(),
                            joinedTournaments: {},
                            isAdmin: false,
                            totalDeposited: 0, // NEW: totalDeposited
                            ...(localReferrerUid && {
                                referredBy: localReferrerUid
                            })
                        };
                        await set(userRef, newUserProfile);
                        userProfile = newUserProfile;
                        if (newUserProfile.bonusCash > 0) {
                            await recordTransaction(user.uid, 'signup_bonus', newUserProfile.bonusCash, `Welcome Bonus`);
                        }
                        if (localReferrerUid && appSettings.referralBonus > 0) {
                            console.log(`Awarding referral bonus of ${appSettings.referralBonus} to referrer: ${localReferrerUid}`);
                            const referrerRef = ref(db, `users/${localReferrerUid}`);
                            try {
                                const referrerUpdateResult = await runTransaction(referrerRef, (referrerData) => {
                                    if (referrerData) {
                                        referrerData.balance = (referrerData.balance || 0) + appSettings.referralBonus;
                                        referrerData.bonusCash = (referrerData.bonusCash || 0) + appSettings.referralBonus;
                                        referrerData.referralEarnings = (referrerData.referralEarnings || 0) + appSettings.referralBonus;
                                    }
                                    return referrerData;
                                });
                                if (referrerUpdateResult.committed) {
                                    await recordTransaction(localReferrerUid, 'referral_bonus', appSettings.referralBonus, `Referral Bonus from ${newUserProfile.displayName || newUserProfile.email}`);
                                    console.log("Referrer bonus awarded successfully.");
                                } else {
                                    console.error("Referrer bonus transaction aborted.");
                                }
                            } catch (referrerError) {
                                console.error("Error awarding referrer bonus:", referrerError);
                            }
                        }
                    }
                    populateUserInfo(user, userProfile);
                    setupRealtimeListeners(user.uid);
                    updateGlobalUI(true);
                    const targetSection = (currentSectionId === 'login-section' || !getElement(currentSectionId)) ? 'home-section' : currentSectionId;
                    showSection(targetSection);
                    // Check if user is returning from ZapUPI payment
                    // URL mein order_id ho ya localStorage mein pending ho
                    const pendingPayment = localStorage.getItem('wz_pending_payment');
                    const urlHasOrder = new URLSearchParams(location.search).get('order_id');
                    if (urlHasOrder || pendingPayment) {
                        await checkPaymentReturn();
                    }
                } catch (error) {
                    console.error("Profile handling error:", error);
                    alert("Error loading profile. Logging out. " + error.message);
                    try {
                        await logoutUser();
                    } catch (logoutErr) {}
                }
            } else {
                console.log("Auth State: Logged Out");
                currentUser = null;
                userProfile = {};
                updateGlobalUI(false);
                showSection('login-section');
            }
            showLoader(false);
        }

        async function loadAppSettings() {
            console.log("Loading App Settings...");
            try {
                const settingsRef = ref(db, 'settings');
                const snapshot = await get(settingsRef);
                if (snapshot.exists()) {
                    appSettings = snapshot.val() || {};
                    console.log("App Settings Loaded:", appSettings);
                    if (appSettings.logoUrl && elements.appLogo) elements.appLogo.src = appSettings.logoUrl;
                    if (appSettings.minWithdraw && elements.minWithdrawAmount) elements.minWithdrawAmount.textContent = appSettings.minWithdraw;
                } else {
                    console.warn("App Settings not found in database!");
                    appSettings = {};
                }
            } catch (e) {
                console.error("Settings load failed", e);
                appSettings = {};
            }
        }

        function loadHomePageData() {
            console.log("Loading Home Page Data...");
            if (!currentUser) {
                console.log("User not logged in, skipping home data load.");
                if (elements.promotionSlider?.querySelector('.swiper-wrapper')) elements.promotionSlider.querySelector('.swiper-wrapper').innerHTML = '';
                if (elements.gamesList) elements.gamesList.innerHTML = '';
                // My Contests cards will show placeholders
                if (elements.myUpcomingCount) elements.myUpcomingCount.innerHTML = '<span class="placeholder col-6"></span>';
                if (elements.myOngoingCount) elements.myOngoingCount.innerHTML = '<span class="placeholder col-6"></span>';
                if (elements.myCompletedCount) elements.myCompletedCount.innerHTML = '<span class="placeholder col-6"></span>';
                return;
            }
            loadPromotions();
            loadGames();
            updateMyContestCounts();
        }

        async function loadPromotions() {
            console.log("Loading Promotions...");
            if (!elements.promotionSlider) return;
            const sliderWrapper = elements.promotionSlider.querySelector('.swiper-wrapper');
            if (!sliderWrapper) return;
            sliderWrapper.classList.add('placeholder-glow');
            sliderWrapper.innerHTML = `<div class="swiper-slide"><span class="placeholder" style="height: 100%; border-radius: 10px; display: block; width: 100%;"></span></div>`;
            const promoRef = ref(db, 'promotions');
            try {
                const snapshot = await get(promoRef);
                const promotions = snapshot.val() || {};
                const activePromotions = Object.values(promotions).filter(p => p.imageUrl);
                console.log(`Found ${activePromotions.length} active promotions.`);
                removePlaceholders(elements.promotionSlider);
                sliderWrapper.innerHTML = '';
                if (activePromotions.length > 0) {
                    elements.promotionSlider.style.display = 'block';
                    activePromotions.forEach(promo => {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide';
                        slide.innerHTML = promo.link ? `<a href="${promo.link}" target="_blank"><img src="${promo.imageUrl}" alt="Promo"></a>` : `<img src="${promo.imageUrl}" alt="Promo">`;
                        sliderWrapper.appendChild(slide);
                    });
                    if (swiperInstance) swiperInstance.destroy(true, true);
                    // MODIFIED: Removed pagination configuration
                    swiperInstance = new Swiper(elements.promotionSlider, {
                        loop: activePromotions.length > 1,
                        autoplay: {
                            delay: 3500,
                            disableOnInteraction: false
                        },
                        slidesPerView: 1
                    });
                } else {
                    elements.promotionSlider.style.display = 'none';
                }
            } catch (e) {
                console.error("Promo load failed:", e);
                removePlaceholders(elements.promotionSlider);
                sliderWrapper.innerHTML = '<p class="text-danger text-center small p-3">Could not load promotions.</p>';
                elements.promotionSlider.style.display = 'block';
            }
        }

        async function loadGames() {
            console.log("Loading Games...");
            if (!elements.gamesList) return;
            elements.gamesList.classList.add('placeholder-glow');
            elements.gamesList.innerHTML = `<div class="col-6"><div class="game-card custom-card"><span class="placeholder d-block" style="height: 130px;"></span><span class="placeholder d-block mt-2 col-8 mx-auto" style="height: 20px;"></span></div></div> <div class="col-6"><div class="game-card custom-card"><span class="placeholder d-block" style="height: 130px;"></span><span class="placeholder d-block mt-2 col-8 mx-auto" style="height: 20px;"></span></div></div>`;
            const gamesRef = ref(db, 'games');
            try {
                const snapshot = await get(gamesRef);
                const games = snapshot.val() || {};
                const activeGames = Object.entries(games).filter(([, game]) => game.imageUrl && game.name).sort(([, gameA], [, gameB]) => (gameA.order || 0) - (gameB.order || 0));
                console.log(`Found ${activeGames.length} active games.`);
                removePlaceholders(elements.gamesList);
                elements.gamesList.innerHTML = '';
                if (activeGames.length > 0) {
                    if (!appSettings.games) appSettings.games = {};
                    activeGames.forEach(([gameId, game]) => {
                        appSettings.games[gameId] = {
                            name: game.name
                        };
                        const col = document.createElement('div');
                        col.className = 'col-6';
                        col.innerHTML = `<div class="game-card custom-card" data-game-id="${gameId}" data-game-name="${game.name}"><img src="${game.imageUrl}" alt="${game.name}"><span>${game.name}</span></div>`;
                        col.querySelector('.game-card').addEventListener('click', () => {
                            currentTournamentsView = 'all'; // Set mode to all tournaments
                            currentTournamentGameId = gameId;
                            // Reset tab to 'upcoming' when changing game, and then show section
                            elements.tournamentTabs.forEach(t => t.classList.remove('active'));
                            querySel('.tournament-tabs .tab-item[data-status="upcoming"]')?.classList.add('active');
                            showSection('tournaments-section');
                        });
                        elements.gamesList.appendChild(col);
                    });
                } else {
                    elements.gamesList.innerHTML = '<p class="text-secondary text-center col-12">No games available.</p>';
                }
            } catch (e) {
                console.error("Games load failed:", e);
                removePlaceholders(elements.gamesList);
                elements.gamesList.innerHTML = '<p class="text-danger text-center col-12">Could not load games.</p>';
            }
        }

        // Renamed from loadTournamentsForGame, now directly called by showSection and accepts status
        // and uses the global `currentTournamentsView` and `currentTournamentGameId`
        async function filterTournaments(status) {
            console.log(`Filtering tournaments. View: ${currentTournamentsView}, Status: ${status}, Game ID: ${currentTournamentGameId}`);
            if (!elements.tournamentsListContainer) return;

            elements.tournamentsListContainer.innerHTML = '';
            elements.tournamentsListContainer.classList.add('placeholder-glow');
            elements.tournamentsListContainer.innerHTML = `<div class="tournament-card placeholder-glow mb-3"><span class="placeholder col-6" style="height: 18px;"></span><span class="placeholder col-12 mt-2" style="height: 24px;"></span><span class="placeholder col-10 mt-2" style="height: 16px;"></span><div class="d-flex justify-content-between mt-3"><span class="placeholder col-4" style="height: 30px; border-radius: 6px;"></span><span class="placeholder col-4" style="height: 30px; border-radius: 6px;"></span></div></div>`;
            elements.noTournamentsMessage.style.display = 'none';

            if (currentTournamentListenerKey && dbListeners[currentTournamentListenerKey]) {
                const {
                    func,
                    queryObj
                } = dbListeners[currentTournamentListenerKey];
                if (queryObj && func) {
                    off(queryObj, 'value', func);
                    console.log("Detached previous tournament list listener:", currentTournamentListenerKey);
                } else {
                    console.warn("Could not detach tournament listener: queryObj or func missing for", currentTournamentListenerKey);
                }
                delete dbListeners[currentTournamentListenerKey];
                currentTournamentListenerKey = null;
            }

            let tournamentsQuery;
            if (currentTournamentsView === 'my') {
                tournamentsQuery = ref(db, 'tournaments'); // Fetch all to filter client-side by joinedTournaments
                elements.headerGameTitle.textContent = 'My Contests';
            } else if (currentTournamentGameId) {
                tournamentsQuery = query(ref(db, 'tournaments'), orderByChild('gameId'), equalTo(currentTournamentGameId));
                elements.headerGameTitle.textContent = appSettings?.games?.[currentTournamentGameId]?.name || 'Game Tournaments';
            } else {
                elements.tournamentsListContainer.innerHTML = '<p class="text-secondary text-center mt-4">Select a game from Home page first.</p>';
                return;
            }

            currentTournamentListenerKey = `tournaments-${currentTournamentsView}-${currentTournamentGameId || 'all_games'}-${status}`;

            try {
                const listenerFunc = onValue(tournamentsQuery, (s) => {
                    console.log(`Realtime update for tournaments. View: ${currentTournamentsView}, Status: ${status}`);
                    const allTournaments = s.val() || {};
                    const filteredTournaments = Object.entries(allTournaments).filter(([tId, t]) => {
                        // Filter by status first
                        if (t.status !== status) return false;

                        if (currentTournamentsView === 'my') {
                            // In 'my' view, check if the current user has joined this tournament
                            return currentUser && userProfile?.joinedTournaments?.[tId] && typeof userProfile.joinedTournaments[tId] === 'object';
                        }
                        // If currentTournamentsView is 'all', gameId is already handled by the query (if gameId exists)
                        // If currentTournamentGameId was not set, it will fetch all and show, which is fine as a fallback.
                        return true;
                    }).sort(([, tA], [, tB]) => (tA.startTime || 0) - (tB.startTime || 0));

                    console.log(`Found ${filteredTournaments.length} tournaments matching criteria (realtime).`);

                    removePlaceholders(elements.tournamentsListContainer);
                    elements.tournamentsListContainer.innerHTML = '';

                    if (filteredTournaments.length > 0) {
                        elements.noTournamentsMessage.style.display = 'none';
                        filteredTournaments.forEach(([tId, t]) => {
                            const card = createTournamentCardElement(tId, t);
                            elements.tournamentsListContainer.appendChild(card);
                        });
                    } else {
                        elements.noTournamentsMessage.style.display = 'block';
                        elements.noTournamentsMessage.textContent = `No ${status} tournaments found for ${currentTournamentsView === 'my' ? 'you' : 'this game'}.`;
                    }
                }, (error) => {
                    console.error(`Tournaments listener error (view: ${currentTournamentsView}, status: ${status}):`, error);
                    removePlaceholders(elements.tournamentsListContainer);
                    elements.tournamentsListContainer.innerHTML = '<p class="text-danger text-center mt-4">Could not load tournaments.</p>';
                    elements.noTournamentsMessage.style.display = 'none';
                    if (dbListeners[currentTournamentListenerKey]) { // Detach on error
                        const {
                            func,
                            queryObj
                        } = dbListeners[currentTournamentListenerKey];
                        if (queryObj && func) off(queryObj, 'value', func);
                        delete dbListeners[currentTournamentListenerKey];
                        currentTournamentListenerKey = null;
                    }
                });
                dbListeners[currentTournamentListenerKey] = {
                    func: listenerFunc,
                    queryObj: tournamentsQuery
                };
                console.log("Attached new tournament list listener:", currentTournamentListenerKey);

            } catch (e) {
                console.error(`Tournaments filter setup failed (${status}):`, e);
                removePlaceholders(elements.tournamentsListContainer);
                elements.tournamentsListContainer.innerHTML = '<p class="text-danger text-center mt-4">Could not set up tournament listener.</p>';
                elements.noTournamentsMessage.style.display = 'none';
            }
        }


        function createTournamentCardElement(tId, t) {
            const card = document.createElement('div');
            card.className = 'tournament-card';
            card.dataset.tournamentId = tId;
            const eFee = t.entryFee || 0;
            const pkPrize = t.perKillPrize || 0;
            const pPool = t.prizePool || 0;
            const sTime = t.startTime ? new Date(t.startTime) : null;
            const sTimeLoc = sTime ? sTime.toLocaleString([], {
                dateStyle: 'short',
                timeStyle: 'short'
            }) : 'TBA';
            const regP = t.registeredPlayers || {};
            const regC = Object.keys(regP).length;
            const maxP = t.maxPlayers || 0;
            const spotsL = maxP > 0 ? Math.max(0, maxP - regC) : Infinity;
            const isF = maxP > 0 && spotsL <= 0;
            // Check if user has joined based on 'joinedTournaments' storing an object instead of true
            const isJ = currentUser && userProfile?.joinedTournaments?.[tId] && typeof userProfile.joinedTournaments[tId] === 'object'; // MODIFIED: Check if joined is an object
            const canJ = !isJ && !isF && t.status === 'upcoming';
            let timerTxt = t.status?.toUpperCase() || 'N/A';
            if (t.status === 'upcoming' && sTime) timerTxt = getTimeRemaining(t.startTime);
            else if (t.status === 'ongoing') timerTxt = 'LIVE';
            else if (t.status === 'completed' || t.status === 'result') timerTxt = 'ENDED';
            let spotsTxt = 'Unlimited Spots';
            let progP = 0;
            if (maxP > 0) {
                spotsTxt = `Spots Left (${regC}/${maxP})`;
                progP = Math.min(100, (regC / maxP) * 100);
            }
            let actBtn = '';
            let idPassBtn = '';

            // MODIFIED: Logic for Action Button and new "See Results" button
            if (t.status === 'result') { // If tournament is in 'result' status
                const inGameName = userProfile.joinedTournaments?.[tId]?.inGameName || 'N/A'; // Get in-game name if user joined
                actBtn = `<button class="btn btn-custom btn-sm btn-success btn-view-results" data-tournament-id="${tId}" data-tournament-name="${t.name}" title="View Results"><i class="bi bi-bar-chart-fill"></i> See Results ${isJ ? `(${sanitizeHTML(inGameName)})` : ''}</button>`; // Use btn-success for screenshot consistency
            } else if (isJ) { // If user has joined AND it's not a result tournament
                const inGameName = userProfile.joinedTournaments[tId]?.inGameName || 'N/A';
                actBtn = `<button class="btn btn-custom btn-sm btn-joined" disabled><i class="bi bi-check-circle-fill"></i> Joined (${sanitizeHTML(inGameName)})</button>`; // MODIFIED: Show in-game name
                if (t.status === 'ongoing' || (t.status === 'upcoming' && t.showIdPass && sTime && Date.now() > sTime.getTime() - 900000)) {
                    idPassBtn = `<button class="btn btn-custom btn-idpass w-100 mt-2 btn-sm" data-tournament-id="${tId}"><i class="bi bi-key-fill"></i> View ID & Pass</button>`;
                }
            } else if (canJ) { // If user can join
                actBtn = `<button class="btn btn-custom btn-sm btn-custom-accent btn-join" data-tournament-id="${tId}" data-fee="${eFee}">₹${eFee} Join <i class="bi bi-arrow-right-short"></i></button>`;
            } else { // Cannot join, not results
                let disR = t.status !== 'upcoming' ? t.status?.toUpperCase() : (isF ? 'Full' : 'Closed');
                actBtn = `<button class="btn btn-custom btn-sm btn-disabled" disabled>${disR || 'N/A'}</button>`;
            }


            card.innerHTML = `<div class="tournament-card-header"><div class="tournament-card-tags">${t.mode ? `<span>${sanitizeHTML(t.mode)}</span>` : ''}${t.map ? `<span>${sanitizeHTML(t.map)}</span>` : ''}${t.tags ? (Array.isArray(t.tags) ? t.tags.map(tag => `<span>${sanitizeHTML(tag)}</span>`).join('') : Object.values(t.tags).map(tag => `<span>${sanitizeHTML(tag)}</span>`).join('')) : ''}</div><div class="tournament-card-timer">${sanitizeHTML(timerTxt)}</div></div><h3 class="tournament-card-title">${t.icon ? `<i class="${sanitizeHTML(t.icon)}"></i>` : '<i class="bi bi-joystick text-accent"></i>'} ${sanitizeHTML(t.name || 'Tournament')}</h3><p class="small text-secondary mb-2"><i class="bi bi-calendar-event"></i> ${sanitizeHTML(sTimeLoc)}</p>
    <!-- Banner Image Section -->
    ${t.bannerUrl ? `<div class="tournament-card-banner"><img src="${t.bannerUrl}" alt="Tournament Banner" onerror="this.parentElement.style.display='none'"></div>` : ''}

    <div class="tournament-card-info"><div class="info-item"><span>Prize Pool</span><strong><i class="bi bi-trophy-fill text-accent prize-icon"></i> ₹${pPool}</strong></div><div class="info-item"><span>Per Kill</span><strong>₹${pkPrize}</strong></div><div class="info-item"><span>Entry Fee</span><strong class="${eFee > 0 ? 'text-info' : ''}">${eFee > 0 ? `₹${eFee}` : 'Free'}</strong></div></div><div class="tournament-card-spots">${sanitizeHTML(spotsTxt)}${maxP > 0 ? `<div class="progress mt-1" style="height: 6px;"><div class="progress-bar bg-warning" style="width: ${progP}%"></div></div>` : ''}</div><div class="tournament-card-actions"><button class="btn btn-custom btn-custom-secondary btn-sm btn-details" data-tournament-id="${tId}">Details</button>${actBtn}</div>${idPassBtn}`;
            const jBtn = card.querySelector('.btn-join');
            if (jBtn) jBtn.addEventListener('click', handleJoinTournamentClick);
            const dBtn = card.querySelector('.btn-details');
            if (dBtn) dBtn.addEventListener('click', handleMatchDetailsClick);
            const ipBtn = card.querySelector('.btn-idpass');
            if (ipBtn) ipBtn.addEventListener('click', handleIdPasswordClick);
            const vResultsBtn = card.querySelector('.btn-view-results'); // NEW: Select results button
            if (vResultsBtn) vResultsBtn.addEventListener('click', (e) => openTournamentUserResultsModal(e.currentTarget.dataset.tournamentId, e.currentTarget.dataset.tournamentName));
            return card;
        }

        // Renamed from loadMyContests. Now updates counts on home screen.
        async function updateMyContestCounts() {
            console.log("Updating My Contest Counts...");
            if (!currentUser) {
                if (elements.myUpcomingCount) elements.myUpcomingCount.textContent = '0';
                if (elements.myOngoingCount) elements.myOngoingCount.textContent = '0';
                if (elements.myCompletedCount) elements.myCompletedCount.textContent = '0';
                return;
            }

            removePlaceholders(elements.myUpcomingCount.closest('.placeholder-glow'));
            removePlaceholders(elements.myOngoingCount.closest('.placeholder-glow'));
            removePlaceholders(elements.myCompletedCount.closest('.placeholder-glow'));

            // Only consider tournaments that actually have user data (not just `true`)
            const joinedIds = Object.keys(userProfile.joinedTournaments || {}).filter(tId => typeof userProfile.joinedTournaments[tId] === 'object');

            if (joinedIds.length === 0) {
                if (elements.myUpcomingCount) elements.myUpcomingCount.textContent = '0';
                if (elements.myOngoingCount) elements.myOngoingCount.textContent = '0';
                if (elements.myCompletedCount) elements.myCompletedCount.textContent = '0';
                console.log("No joined contests found for user to count.");
                return;
            }

            try {
                const contestPromises = joinedIds.map(id => get(ref(db, `tournaments/${id}`)));
                const snapshots = await Promise.all(contestPromises);

                let upcomingCount = 0;
                let ongoingCount = 0;
                let completedCount = 0;

                snapshots.forEach((snapshot) => {
                    if (snapshot.exists()) {
                        const t = snapshot.val();
                        switch (t.status) {
                            case 'upcoming':
                                upcomingCount++;
                                break;
                            case 'ongoing':
                                ongoingCount++;
                                break;
                            case 'completed':
                            case 'result':
                                completedCount++;
                                break;
                        }
                    }
                });

                if (elements.myUpcomingCount) elements.myUpcomingCount.textContent = upcomingCount;
                if (elements.myOngoingCount) elements.myOngoingCount.textContent = ongoingCount;
                if (elements.myCompletedCount) elements.myCompletedCount.textContent = completedCount;

            } catch (e) {
                console.error("My contest counts update failed:", e);
                if (elements.myUpcomingCount) elements.myUpcomingCount.textContent = '?';
                if (elements.myOngoingCount) elements.myOngoingCount.textContent = '?';
                if (elements.myCompletedCount) elements.myCompletedCount.textContent = '?';
            }
        }

        function loadWalletData() {
            console.log("Loading Wallet Data...");
            if (!currentUser) return;
            loadRecentTransactions();
        }

        function loadProfileData() {
            console.log("Loading Profile Data...");
            if (!currentUser) return;
            if (userProfile?.displayName) {
                removePlaceholders(elements.profileName?.closest('.placeholder-glow'));
                removePlaceholders(elements.profileEmail?.closest('.placeholder-glow'));
                removePlaceholders(elements.profileTotalMatches?.closest('.placeholder-glow'));
                removePlaceholders(elements.profileWonMatches?.closest('.placeholder-glow'));
                removePlaceholders(elements.profileTotalEarnings?.closest('.placeholder-glow'));
            }
        }

        function loadEarningsData() {
            console.log("Loading Earnings Data...");
            if (!currentUser || !userProfile) return;
            const wc = userProfile.winningCash || 0;
            const bc = userProfile.bonusCash || 0;
            const re = userProfile.referralEarnings || 0;
            if (elements.earningsTotal) { elements.earningsTotal.textContent = formatCurrency(wc + bc); removePlaceholders(elements.earningsTotal.closest('.placeholder-glow')); }
            if (elements.earningsWinning) { elements.earningsWinning.textContent = formatCurrency(wc); removePlaceholders(elements.earningsWinning.closest('.placeholder-glow')); }
            if (elements.earningsBonus) { elements.earningsBonus.textContent = formatCurrency(bc); removePlaceholders(elements.earningsBonus.closest('.placeholder-glow')); }
            if (elements.earningsReferral) { elements.earningsReferral.textContent = formatCurrency(re); removePlaceholders(elements.earningsReferral.closest('.placeholder-glow')); }
        }

        async function recordTransaction(userId, type, amount, description, details = {}) {
            if (!userId) return;
            const transactionRef = ref(db, `transactions/${userId}`);
            const newTransaction = {
                type,
                amount,
                description,
                status: 'completed',
                timestamp: Date.now(),
                ...details
            };
            try {
                await push(transactionRef, newTransaction);
                console.log(`Transaction recorded: ${type}, Amount: ${amount}`);
            } catch (e) {
                console.error("Transaction record failed:", e);
            }
        }

        async function loadRecentTransactions() {
            console.log("Loading Recent Transactions...");
            if (!currentUser || !elements.recentTransactionsList) return;
            const limit = 5;
            elements.recentTransactionsList.innerHTML = '';
            elements.recentTransactionsList.classList.add('placeholder-glow');
            for (let i = 0; i < 3; i++) elements.recentTransactionsList.innerHTML += `<div class="custom-card p-2 mb-2 placeholder-glow"><div class="d-flex justify-content-between"><span class="placeholder col-5 h-16"></span><span class="placeholder col-3 h-16"></span></div><div class="small text-secondary mt-1"><span class="placeholder col-6 h-14"></span></div></div>`;
            if (elements.noTransactionsMessage) {
                elements.noTransactionsMessage.style.display = 'block';
                elements.noTransactionsMessage.textContent = 'Loading transactions...';
            }
            try {
                const transRef = query(ref(db, `transactions/${currentUser.uid}`), limitToLast(limit));
                const s = await get(transRef);
                const transactions = s.val() || {};
                const sortedT = Object.values(transactions).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
                console.log(`Found ${sortedT.length} recent transactions.`);
                removePlaceholders(elements.recentTransactionsList);
                elements.recentTransactionsList.innerHTML = '';
                if (sortedT.length > 0) {
                    if (elements.noTransactionsMessage) elements.noTransactionsMessage.style.display = 'none';
                    sortedT.forEach(t => {
                        const item = document.createElement('div');
                        item.className = 'custom-card p-2 mb-2 d-flex align-items-center gap-2';
                        const isCr = t.amount > 0;
                        const amt = `${isCr ? '+' : ''}₹${Math.abs(t.amount || 0).toFixed(2)}`;
                        const time = t.timestamp ? new Date(t.timestamp).toLocaleString([], {
                            dateStyle: 'short',
                            timeStyle: 'short'
                        }) : 'N/A';
                        const { icon, color } = getTypeIcon(t.type, t.amount);
                        item.innerHTML = `
                            <div style="width:34px;height:34px;border-radius:50%;flex-shrink:0;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;border:1px solid ${color}33;">
                                <i class="bi ${icon}" style="font-size:0.9rem;color:${color};"></i>
                            </div>
                            <div style="flex:1;min-width:0;">
                                <div class="small fw-bold" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${sanitizeHTML(t.description || t.type || 'Txn')}</div>
                                <div class="small text-secondary">${sanitizeHTML(time)}</div>
                            </div>
                            <div class="fw-bold ${isCr ? 'text-success' : 'text-danger'}" style="flex-shrink:0;">${sanitizeHTML(amt)}</div>`;
                        elements.recentTransactionsList.appendChild(item);
                    });
                } else if (elements.noTransactionsMessage) {
                    elements.noTransactionsMessage.style.display = 'block';
                    elements.noTransactionsMessage.textContent = 'No recent transactions.';
                }
            } catch (e) {
                console.error("Transactions load failed:", e);
                removePlaceholders(elements.recentTransactionsList);
                elements.recentTransactionsList.innerHTML = '<p class="text-danger tc">Could not load transactions.</p>';
                if (elements.noTransactionsMessage) elements.noTransactionsMessage.style.display = 'none';
            }
        }

        // ── All Transactions Modal ─────────────────────────────────
        let allTxnData = []; // cache for filter
        let currentTxnFilter = 'all';

        async function openAllTransactionsModal() {
            if (!currentUser) { alert("Please login first."); return; }
            if (!elements.allTransactionsModalInstance) return;

            // Reset state
            currentTxnFilter = 'all';
            document.querySelectorAll('.txn-filter-btn').forEach(b => {
                b.style.background = b.dataset.filter === 'all' ? 'var(--accent-gradient)' : b.style.background;
                b.classList.toggle('active', b.dataset.filter === 'all');
            });

            elements.allTransactionsModalInstance.show();
            renderAllTransactions(null); // show loader

            try {
                const transRef = ref(db, `transactions/${currentUser.uid}`);
                const snap = await get(transRef);
                const raw = snap.val() || {};
                allTxnData = Object.values(raw).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
                renderAllTransactions(allTxnData);
            } catch(e) {
                console.error("All transactions load failed:", e);
                if (elements.allTransactionsList)
                    elements.allTransactionsList.innerHTML = '<p class="text-danger text-center p-4">Could not load transactions. Please try again.</p>';
            }
        }

        function getTypeIcon(type, amount) {
            if (!type) return { icon: 'bi-arrow-left-right', color: 'var(--text-secondary)' };
            const t = type.toLowerCase();
            if (t.includes('deposit') || t.includes('add')) return { icon: 'bi-wallet-fill', color: 'var(--info-color)' };
            if (t.includes('withdraw')) return { icon: 'bi-cash-coin', color: 'var(--warning-color)' };
            if (t.includes('win') || t.includes('prize') || t.includes('bonus') || t.includes('referral')) return { icon: 'bi-trophy-fill', color: 'var(--success-color)' };
            if (t.includes('join') || t.includes('tournament')) return { icon: 'bi-controller', color: 'var(--danger-color)' };
            if (amount > 0) return { icon: 'bi-arrow-down-circle-fill', color: 'var(--success-color)' };
            return { icon: 'bi-arrow-up-circle-fill', color: 'var(--danger-color)' };
        }

        function renderAllTransactions(list) {
            if (!elements.allTransactionsList) return;

            if (list === null) {
                elements.allTransactionsList.innerHTML = `
                    <div class="text-center p-5">
                        <div class="spinner-border" style="color:var(--accent-color);" role="status"></div>
                        <p class="text-secondary mt-2 small">Loading transactions...</p>
                    </div>`;
                if (elements.txnCountLabel) elements.txnCountLabel.textContent = '';
                return;
            }

            // Apply filter
            let filtered = list;
            if (currentTxnFilter === 'credit') filtered = list.filter(t => (t.amount || 0) > 0);
            else if (currentTxnFilter === 'debit') filtered = list.filter(t => (t.amount || 0) < 0);
            else if (currentTxnFilter === 'deposit') filtered = list.filter(t => (t.type || '').toLowerCase().includes('deposit') || (t.type || '').toLowerCase().includes('add'));
            else if (currentTxnFilter === 'withdraw') filtered = list.filter(t => (t.type || '').toLowerCase().includes('withdraw'));

            if (elements.txnCountLabel) elements.txnCountLabel.textContent = `${filtered.length} transaction${filtered.length !== 1 ? 's' : ''}`;

            if (filtered.length === 0) {
                elements.allTransactionsList.innerHTML = `
                    <div class="text-center p-5">
                        <i class="bi bi-inbox" style="font-size:2.5rem;color:var(--text-secondary);"></i>
                        <p class="text-secondary mt-3">No transactions found.</p>
                    </div>`;
                return;
            }

            let html = '';
            filtered.forEach(t => {
                const isCr = (t.amount || 0) > 0;
                const amt = `${isCr ? '+' : ''}₹${Math.abs(t.amount || 0).toFixed(2)}`;
                const time = t.timestamp ? new Date(t.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A';
                const desc = t.description || t.type || 'Transaction';
                const { icon, color } = getTypeIcon(t.type, t.amount);
                html += `
                <div style="
                    display:flex;align-items:center;gap:12px;
                    padding:12px;margin:6px 4px;
                    background:var(--card-bg);border-radius:12px;
                    border:1px solid var(--border-color);
                ">
                    <div style="
                        width:42px;height:42px;border-radius:50%;flex-shrink:0;
                        background:rgba(255,255,255,0.05);
                        display:flex;align-items:center;justify-content:center;
                        border:1px solid ${color}33;
                    ">
                        <i class="bi ${icon}" style="font-size:1.1rem;color:${color};"></i>
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:0.88rem;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                            ${sanitizeHTML(desc)}
                        </div>
                        <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">${sanitizeHTML(time)}</div>
                    </div>
                    <div style="font-size:0.95rem;font-weight:700;flex-shrink:0;color:${isCr ? 'var(--success-color)' : 'var(--danger-color)'};">
                        ${sanitizeHTML(amt)}
                    </div>
                </div>`;
            });
            elements.allTransactionsList.innerHTML = html;
        }

        // Filter button click handler (delegated on modal)
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.txn-filter-btn');
            if (!btn) return;
            currentTxnFilter = btn.dataset.filter || 'all';
            document.querySelectorAll('.txn-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderAllTransactions(allTxnData);
        });
        // ── End All Transactions Modal ─────────────────────────────

        // ── User Notifications Page ────────────────────────────────
        async function loadUserNotifications() {
            if (!currentUser || !elements.notificationsList) return;
            elements.notificationsList.innerHTML = `<div class="text-center p-5"><div class="spinner-border" style="color:var(--accent-color);" role="status"></div></div>`;

            try {
                // Fetch global notifications + personal notifications
                const [globalSnap, personalSnap] = await Promise.all([
                    get(ref(db, 'notifications')),
                    get(ref(db, `userNotifications/${currentUser.uid}`))
                ]);

                const readSet = new Set(JSON.parse(localStorage.getItem(`notif_read_${currentUser.uid}`) || '[]'));
                let notifs = [];

                // Add global notifications (for all or matching email)
                if (globalSnap.exists()) {
                    globalSnap.forEach(child => {
                        const n = child.val();
                        // Show if: no targetEmail (all users) OR targetEmail matches current user
                        if (!n.targetEmail || n.targetEmail === currentUser.email) {
                            notifs.push({ id: child.key, ...n, source: 'global' });
                        }
                    });
                }
                // Add personal notifications (not already in global)
                if (personalSnap.exists()) {
                    personalSnap.forEach(child => {
                        notifs.push({ id: `p_${child.key}`, ...child.val(), source: 'personal' });
                    });
                }

                // Sort newest first
                notifs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

                // Update notification badge count (unread)
                const unreadCount = notifs.filter(n => !readSet.has(n.id)).length;
                const badge = document.querySelector('.notification-badge');
                if (badge) { badge.textContent = unreadCount; badge.style.display = unreadCount > 0 ? 'flex' : 'none'; }

                if (notifs.length === 0) {
                    elements.notificationsList.innerHTML = `
                        <div class="text-center p-5">
                            <i class="bi bi-bell-slash" style="font-size:3rem;color:var(--text-secondary);"></i>
                            <p class="text-secondary mt-3">Koi notification nahi hai abhi.</p>
                        </div>`;
                    return;
                }

                let html = '';
                notifs.forEach(n => {
                    const isRead = readSet.has(n.id);
                    const time = n.createdAt ? new Date(n.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : '';
                    html += `
                    <div class="custom-card mb-3 notif-item ${isRead ? 'notif-read' : 'notif-unread'}" data-notif-id="${sanitizeHTML(n.id)}"
                         style="${!isRead ? 'border-left:3px solid var(--accent-color);' : 'opacity:0.75;'}">
                        <div style="display:flex;gap:12px;align-items:flex-start;">
                            ${n.imageUrl ? `<img src="${sanitizeHTML(n.imageUrl)}" style="width:56px;height:56px;object-fit:cover;border-radius:10px;flex-shrink:0;" alt="">` : `<div style="width:44px;height:44px;background:var(--accent-gradient);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="bi bi-bell-fill" style="color:#070A12;font-size:1.1rem;"></i></div>`}
                            <div style="flex:1;min-width:0;">
                                <div style="font-size:0.9rem;font-weight:700;color:var(--text-primary);">${sanitizeHTML(n.title || 'Notification')}</div>
                                <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;line-height:1.5;">${sanitizeHTML(n.message || '')}</div>
                                <div style="font-size:0.72rem;color:var(--text-muted-custom,var(--text-secondary));margin-top:6px;">${sanitizeHTML(time)}</div>
                            </div>
                            ${!isRead ? `<div style="width:8px;height:8px;background:var(--accent-color);border-radius:50%;flex-shrink:0;margin-top:4px;"></div>` : ''}
                        </div>
                    </div>`;
                });
                elements.notificationsList.innerHTML = html;

                // Click to mark as read
                elements.notificationsList.querySelectorAll('.notif-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const nid = item.dataset.notifId;
                        readSet.add(nid);
                        localStorage.setItem(`notif_read_${currentUser.uid}`, JSON.stringify([...readSet]));
                        item.style.borderLeft = '';
                        item.style.opacity = '0.75';
                        item.querySelector('.notif-unread')?.classList.replace('notif-unread', 'notif-read');
                        // Update badge
                        const remaining = notifs.filter(n => !readSet.has(n.id)).length;
                        if (badge) { badge.textContent = remaining; badge.style.display = remaining > 0 ? 'flex' : 'none'; }
                    });
                });

                // Mark all read button
                elements.markAllReadBtn?.addEventListener('click', () => {
                    notifs.forEach(n => readSet.add(n.id));
                    localStorage.setItem(`notif_read_${currentUser.uid}`, JSON.stringify([...readSet]));
                    elements.notificationsList.querySelectorAll('.notif-item').forEach(item => {
                        item.style.borderLeft = ''; item.style.opacity = '0.75';
                    });
                    if (badge) { badge.textContent = 0; badge.style.display = 'none'; }
                }, { once: true });

            } catch(e) {
                console.error("Error loading notifications:", e);
                elements.notificationsList.innerHTML = '<p class="text-danger text-center p-4">Notifications load karne mein error aai.</p>';
            }
        }


        // ── ANNOUNCEMENTS ──────────────────────────────────────────
        async function loadAnnouncements() {
            if (!currentUser || !elements.announcementsList) return;
            elements.announcementsList.innerHTML = `<div class="text-center p-5"><div class="spinner-border" style="color:var(--accent-color);" role="status"></div></div>`;
            try {
                const snap = await get(ref(db, 'announcements'));
                if (!snap.exists()) {
                    elements.announcementsList.innerHTML = `<div class="ann-empty"><i class="bi bi-megaphone"></i><p>Abhi koi announcement nahi hai.</p></div>`;
                    return;
                }
                const items = [];
                snap.forEach(child => { items.push({ id: child.key, ...child.val() }); });
                items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                let html = '';
                items.forEach(ann => {
                    const time = ann.createdAt ? new Date(ann.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : '';
                    html += `<div class="ann-card">
                        <div class="ann-badge"><i class="bi bi-megaphone-fill me-1"></i>Announcement</div>
                        <div class="ann-msg" style="font-size:0.92rem;font-weight:500;color:var(--text-primary);line-height:1.6;">${sanitizeHTML(ann.message || '')}</div>
                        <div class="ann-time"><i class="bi bi-clock me-1"></i>${time}</div>
                    </div>`;
                });
                elements.announcementsList.innerHTML = html;
            } catch(e) {
                console.error("Announcements load error:", e);
                elements.announcementsList.innerHTML = '<p class="text-danger text-center p-4">Announcements load karne mein error.</p>';
            }
        }

        async function loadAnnouncementTicker() {
            try {
                const snap = await get(ref(db, 'announcements'));
                if (!elements.annTickerBar || !elements.annTickerText) return;
                // Hide ticker if no announcements
                if (!snap.exists()) {
                    elements.annTickerBar.style.display = 'none';
                    document.body.classList.remove('has-ann-ticker');
                    return;
                }
                const msgs = [];
                snap.forEach(child => {
                    const v = child.val();
                    // ONLY message - no title, no image in ticker
                    if (v.message && v.message.trim()) msgs.push(v.message.trim());
                });
                if (msgs.length === 0) {
                    elements.annTickerBar.style.display = 'none';
                    document.body.classList.remove('has-ann-ticker');
                    return;
                }
                // Join all messages with bullet separator
                elements.annTickerText.textContent = msgs.join('   •   ');
                elements.annTickerBar.style.display = 'flex';
                document.body.classList.add('has-ann-ticker');
            } catch(e) { console.warn("Ticker load error:", e); }
        }
        // ── End Announcements ───────────────────────────────────────

        // ── Update notification badge on login ─────────────────────
        async function updateNotifBadge() {
            if (!currentUser) return;
            try {
                const [globalSnap, personalSnap] = await Promise.all([
                    get(ref(db, 'notifications')),
                    get(ref(db, `userNotifications/${currentUser.uid}`))
                ]);
                const readSet = new Set(JSON.parse(localStorage.getItem(`notif_read_${currentUser.uid}`) || '[]'));
                let count = 0;
                if (globalSnap.exists()) globalSnap.forEach(child => { const n = child.val(); if (!n.targetEmail || n.targetEmail === currentUser.email) { if (!readSet.has(child.key)) count++; } });
                if (personalSnap.exists()) personalSnap.forEach(child => { if (!readSet.has(`p_${child.key}`)) count++; });
                const badge = document.querySelector('.notification-badge');
                if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }
            } catch(e) { console.warn("Notif badge update error:", e); }
        }
        // ── End Notifications ──────────────────────────────────────

        // MODIFIED: handleJoinTournamentClick to open In-Game Name modal first
        async function handleJoinTournamentClick(event) {
            if (!currentUser) {
                alert("Login to join.");
                showSection('login-section');
                return;
            }
            const btn = event.currentTarget;
            const tId = btn.dataset.tournamentId;
            const fee = parseFloat(btn.dataset.fee || 0);
            if (!tId) return;

            // Store the tournament info globally for the modal's confirm button
            pendingJoinTournamentId = tId;
            pendingJoinTournamentFee = fee;

            // Check if user has already joined
            if (userProfile?.joinedTournaments?.[tId] && typeof userProfile.joinedTournaments[tId] === 'object') {
                alert("You have already joined this tournament.");
                // Re-enable button if it was disabled by a quick double click
                const currentBtn = event.currentTarget;
                if (currentBtn) {
                    currentBtn.disabled = false;
                    currentBtn.innerHTML = `₹${fee.toFixed(2)} Join <i class="bi bi-arrow-right-short"></i>`;
                }
                return;
            }

            // Pre-fill in-game name from user profile gameId field, fallback to displayName
            const existingInGameName = userProfile?.gameId || userProfile?.inGameName || '';
            elements.inGameNameInput.value = existingInGameName;
            clearStatusMessage(elements.inGameNameStatusMessage);

            elements.inGameNameModalInstance.show();
        }

        // ADDED: New function to execute the actual join logic after getting in-game name
        async function executeJoinTournamentLogic(tId, fee, inGameName, btnReference) {
            if (!currentUser || !tId || !inGameName) {
                return;
            }

            showLoader(true);
            // Visually disable the original join button if it's still available
            if (btnReference) {
                btnReference.disabled = true;
                btnReference.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
            }

            const uRef = ref(db, `users/${currentUser.uid}`);
            const tRef = ref(db, `tournaments/${tId}`);
            let tData = null;
            let transactionResult = null;

            try {
                // Step 1: Deduct balance and mark as joined in user profile
                transactionResult = await runTransaction(uRef, (profileData) => {
                    if (!profileData) throw new Error("User profile missing.");
                    if ((profileData.balance || 0) < fee) throw new Error("Insufficient balance.");
                    // Double-check if already joined, in case of multiple clicks/modal re-open
                    if (profileData.joinedTournaments?.[tId] && typeof profileData.joinedTournaments[tId] === 'object') {
                        console.warn("Already joined (Tx check).");
                        return; // Abort transaction if already joined
                    }
                    profileData.balance = (profileData.balance || 0) - fee;
                    if (!profileData.joinedTournaments) profileData.joinedTournaments = {};
                    // Store inGameName along with joined status
                    profileData.joinedTournaments[tId] = {
                        joinedAt: serverTimestamp(),
                        inGameName: inGameName
                    }; // MODIFIED: Store inGameName
                    return profileData;
                });

                if (!transactionResult.committed) {
                    // This can happen if the transaction was aborted (e.g., already joined) or failed for other reasons
                    if (userProfile?.joinedTournaments?.[tId] && typeof userProfile.joinedTournaments[tId] === 'object') {
                        throw new Error("You have already joined this tournament.");
                    } else {
                        throw new Error("Join transaction failed. Please try again.");
                    }
                }
                console.log("Balance transaction successful.");

                // Step 2: Fetch tournament data and update registered players
                const snapshot = await get(tRef);
                if (!snapshot.exists()) throw new Error("Tournament not found after transaction.");
                tData = snapshot.val();
                if (tData.status !== 'upcoming') throw new Error("Tournament is no longer upcoming.");
                const rC = tData.registeredPlayers ? Object.keys(tData.registeredPlayers).length : 0;
                if (tData.maxPlayers > 0 && rC >= tData.maxPlayers) throw new Error("Tournament is full.");

                const updates = {};
                // Store inGameName + gameName + email in tournament's registeredPlayers
                const tournamentGameName = appSettings?.games?.[tData.gameId]?.name || tData.gameId || 'Unknown';
                updates[`tournaments/${tId}/registeredPlayers/${currentUser.uid}`] = {
                    joinedAt: serverTimestamp(),
                    inGameName: inGameName,
                    gameName: tournamentGameName,
                    email: currentUser.email || userProfile?.email || ''
                }; // MODIFIED: Store inGameName + gameName + email
                console.log("Attempting to update registered players:", updates);
                await update(ref(db), updates);
                console.log("Successfully updated tournament registered players.");

                // Step 3: Record transaction and update UI
                await recordTransaction(currentUser.uid, 'tournament_join', -fee, `Joined: ${tData.name || 'Tournament'}`, {
                    tournamentId: tId,
                    inGameName: inGameName
                }); // MODIFIED: Record inGameName
                alert(`Joined! ₹${fee.toFixed(2)} deducted.`);

                // Update UI elements
                const finalSnapshot = await get(tRef); // Fetch latest data for card update
                if (finalSnapshot.exists()) {
                    const finalTData = finalSnapshot.val();
                    const cardEl = document.querySelector(`.tournament-card[data-tournament-id="${tId}"]`); // Find card by ID
                    if (cardEl && cardEl.parentNode) {
                        cardEl.parentNode.replaceChild(createTournamentCardElement(tId, finalTData), cardEl);
                    } else {
                        if (currentSectionId === 'tournaments-section' && currentTournamentGameId) {
                            /* filterTournaments will update via listener */ }
                    }
                    // Re-run updateMyContestCounts to refresh numbers on home screen
                    updateMyContestCounts();
                } else {
                    console.warn("Tournament data missing after successful join update?");
                    if (currentSectionId === 'tournaments-section' && currentTournamentGameId) {
                        /* filterTournaments will update */ }
                    updateMyContestCounts();
                }
                if (currentSectionId === 'wallet-section') loadRecentTransactions();
                elements.inGameNameModalInstance.hide(); // Hide the modal on success

            } catch (e) {
                console.error("Join failed:", e);
                showStatusMessage(elements.inGameNameStatusMessage, `Failed: ${e.message}`, 'danger', false); // Show error in modal
                // If balance was deducted but other updates failed, attempt to refund
                if (transactionResult?.committed && e.message !== "You have already joined this tournament.") {
                    console.error("CRITICAL: Balance deducted but failed to update tournament registration! Attempting refund.");
                    try {
                        const uRef = ref(db, `users/${currentUser.uid}`);
                        const refundTx = await runTransaction(uRef, (profileData) => {
                            if (profileData) {
                                profileData.balance = (profileData.balance || 0) + fee;
                                // Remove tournament from joinedTournaments if it was added
                                if (profileData.joinedTournaments?.[tId] && typeof profileData.joinedTournaments[tId] === 'object') {
                                    delete profileData.joinedTournaments[tId];
                                    if (Object.keys(profileData.joinedTournaments).length === 0) {
                                        delete profileData.joinedTournaments;
                                    }
                                }
                            }
                            return profileData;
                        });
                        if (refundTx.committed) {
                            await recordTransaction(currentUser.uid, 'join_failed_refund', fee, `Refund Failed Join: ${tData?.name || 'Tournament'}`);
                            showStatusMessage(elements.inGameNameStatusMessage, `Failed: ${e.message}. Amount refunded.`, 'danger', false);
                        } else {
                            console.error("Refund transaction failed.");
                            showStatusMessage(elements.inGameNameStatusMessage, `Failed: ${e.message}. FAILED to refund amount! Contact support immediately.`, 'danger', false); // More explicit error
                        }
                    } catch (refundError) {
                        console.error("CRITICAL: FAILED TO REFUND WINNING CASH!", refundError);
                        showStatusMessage(elements.inGameNameStatusMessage, `Failed: ${e.message}. CRITICAL: Failed to refund amount! Contact support immediately.`, 'danger', false);
                    }
                }
            } finally {
                showLoader(false);
                // Re-enable the button in the modal
                if (elements.confirmInGameNameBtn) {
                    elements.confirmInGameNameBtn.disabled = false;
                    elements.confirmInGameNameBtn.innerHTML = 'Confirm & Join';
                }
                // Reset the original button on the card if it was disabled by us
                if (btnReference) {
                    btnReference.disabled = false;
                    btnReference.innerHTML = `₹${fee.toFixed(2)} Join <i class="bi bi-arrow-right-short"></i>`;
                }
            }
        }


        function handleWithdrawClick() {
            if (!currentUser || !elements.withdrawModalInstance) return;
            const wc = userProfile.winningCash || 0;
            const minW = appSettings?.minWithdraw || 50;
            elements.minWithdrawAmount.textContent = minW;
            elements.withdrawModalBalance.textContent = `₹${wc.toFixed(2)}`;
            elements.withdrawAmountInput.value = '';
            elements.withdrawAmountInput.min = minW;
            elements.withdrawMethodInput.value = userProfile.upiId || '';
            clearStatusMessage(elements.withdrawStatusMessage);
            elements.withdrawModalInstance.show();
        }
        async function submitWithdrawRequestHandler() {
            if (!currentUser || !elements.withdrawModalInstance) return;
            const amt = parseFloat(elements.withdrawAmountInput.value);
            const mtd = elements.withdrawMethodInput.value.trim();
            const wc = userProfile.winningCash || 0;
            const minW = appSettings?.minWithdraw || 50;
            clearStatusMessage(elements.withdrawStatusMessage);
            if (isNaN(amt) || amt <= 0) {
                showStatusMessage(elements.withdrawStatusMessage, 'Invalid amount.', 'warning');
                return;
            }
            if (amt < minW) {
                showStatusMessage(elements.withdrawStatusMessage, `Min withdraw ₹${minW}.`, 'warning');
                return;
            }
            if (amt > wc) {
                showStatusMessage(elements.withdrawStatusMessage, 'Insufficient winning balance.', 'warning');
                return;
            }
            if (!mtd) {
                showStatusMessage(elements.withdrawStatusMessage, 'Enter withdrawal method.', 'warning');
                return;
            }
            elements.submitWithdrawRequestBtn.disabled = true;
            elements.submitWithdrawRequestBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';
            let transactionCommitted = false;
            try {
                const uRef = ref(db, `users/${currentUser.uid}`);
                const txResult = await runTransaction(uRef, (prof) => {
                    if (prof) {
                        if ((prof.winningCash || 0) >= amt) {
                            prof.winningCash = (prof.winningCash || 0) - amt;
                            prof.balance = (prof.balance || 0) - amt; // DEDUCT FROM TOTAL BALANCE HERE
                            return prof;
                        } else {
                            throw new Error("Insufficient winning balance (Tx).");
                        }
                    } else {
                        throw new Error("Profile missing (Tx).");
                    }
                });
                if (!txResult.committed) {
                    throw new Error("Failed to update balance. Please try again.");
                }
                transactionCommitted = true;
                console.log("Winning cash and total balance deducted successfully.");
                const wrRef = ref(db, 'withdrawals');
                const newReq = {
                    userId: currentUser.uid,
                    userName: userProfile.displayName || currentUser.email,
                    amount: amt,
                    methodDetails: {
                        methodName: mtd.includes('@') ? 'UPI' : 'Bank/Other',
                        accountInfo: mtd
                    },
                    status: 'pending',
                    requestTimestamp: serverTimestamp(),
                    userEmail: currentUser.email || 'N/A'
                };
                const newWithdrawalRef = await push(wrRef, newReq);
                console.log("Withdrawal request created:", newWithdrawalRef.key);
                await recordTransaction(currentUser.uid, 'withdraw_request', -amt, `Withdrawal Request to ${mtd}`, {
                    withdrawalId: newWithdrawalRef.key
                });
                showStatusMessage(elements.withdrawStatusMessage, 'Request submitted successfully!', 'success', false);
                setTimeout(() => {
                    if (elements.withdrawModalInstance) elements.withdrawModalInstance.hide();
                }, 2500);
                if (currentSectionId === 'wallet-section') loadRecentTransactions();
            } catch (e) {
                console.error("Withdraw error:", e);
                showStatusMessage(elements.withdrawStatusMessage, `Error: ${e.message}`, 'danger');
                if (transactionCommitted) {
                    console.warn("Attempting to refund winning cash and total balance due to withdrawal request failure...");
                    const uRef = ref(db, `users/${currentUser.uid}`);
                    try {
                        await runTransaction(uRef, (prof) => {
                            if (prof) {
                                prof.winningCash = (prof.winningCash || 0) + amt;
                                prof.balance = (prof.balance || 0) + amt; // REFUND TO TOTAL BALANCE HERE
                            }
                            return prof;
                        });
                        await recordTransaction(currentUser.uid, 'withdraw_failed_refund', amt, `Refund Failed Withdrawal Request`);
                        console.log("Refund successful.");
                        showStatusMessage(elements.withdrawStatusMessage, `Error: ${e.message}. Amount refunded.`, 'danger');
                    } catch (refundError) {
                        console.error("CRITICAL: FAILED TO REFUND WINNING CASH!", refundError);
                        showStatusMessage(elements.withdrawStatusMessage, `Error: ${e.message}. CRITICAL: Failed to refund amount! Contact support.`, 'danger', false);
                    }
                }
            } finally {
                elements.submitWithdrawRequestBtn.disabled = false;
                elements.submitWithdrawRequestBtn.innerHTML = 'Submit Request';
            }
        }
        async function handleMatchDetailsClick(event) {
            console.log("Match Details Clicked");
            if (!elements.matchDetailsModalInstance) return;
            const tId = event.currentTarget.dataset.tournamentId;
            if (!tId) return;
            elements.matchDetailsModalTitle.textContent = 'Loading...';
            elements.matchDetailsModalBody.innerHTML = '<div class="text-center p-5"><div class="spinner-border spinner-border-sm"></div></div>';
            elements.matchDetailsModalInstance.show();
            try {
                const tRef = ref(db, `tournaments/${tId}`);
                const s = await get(tRef);
                if (s.exists()) {
                    const t = s.val();
                    const gName = appSettings.games?.[t.gameId]?.name || t.gameId || 'N/A';
                    const sTimeLoc = t.startTime ? new Date(t.startTime).toLocaleString([], {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    }) : 'TBA';
                    let pDistHTML = '';
                    if (t.prizeDistribution) {
                        let fmtDist = '';
                        if (typeof t.prizeDistribution === 'object') {
                            fmtDist = Object.entries(t.prizeDistribution).map(([rank, prize]) => `Rank ${sanitizeHTML(rank)}: ₹${sanitizeHTML(prize)}`).join('\n');
                        } else {
                            fmtDist = String(t.prizeDistribution).replace(/\\n/g, '\n');
                        }
                        pDistHTML = `<h5>Prize Distribution:</h5><pre>${sanitizeHTML(fmtDist)}</pre>`;
                    }
                    const desc = t.description || 'Standard rules apply.';
                    const fmtDesc = sanitizeHTML(desc).replace(/\n/g, '<br>');
                    elements.matchDetailsModalTitle.textContent = sanitizeHTML(t.name || 'Match Details');
                    elements.matchDetailsModalBody.innerHTML = `<p><strong>Game:</strong> ${sanitizeHTML(gName)}</p><p><strong>Mode:</strong> ${sanitizeHTML(t.mode || 'N/A')}</p><p><strong>Map:</strong> ${sanitizeHTML(t.map || 'N/A')}</p><p><strong>Starts:</strong> ${sanitizeHTML(sTimeLoc)}</p><hr><p><strong>Entry:</strong> ${t.entryFee > 0 ? `₹${t.entryFee}` : 'Free'}</p><p><strong>Prize:</strong> ₹${t.prizePool || 0}</p><p><strong>Per Kill:</strong> ₹${t.perKillPrize || 0}</p><p><strong>Max Players:</strong> ${t.maxPlayers > 0 ? t.maxPlayers : 'Unlimited'}</p><hr><h5>Rules:</h5><div style="white-space: pre-wrap; line-height: 1.6;">${fmtDesc}</div>${pDistHTML}`;
                } else elements.matchDetailsModalBody.innerHTML = '<p class="text-danger">Details not found.</p>';
            } catch (e) {
                console.error("Details load failed:", e);
                elements.matchDetailsModalBody.innerHTML = '<p class="text-danger">Error loading details.</p>';
            }
        }
        async function handleIdPasswordClick(event) {
            if (!elements.idPasswordModalInstance) return;
            const tId = event.currentTarget.dataset.tournamentId;
            if (!tId) return;
            console.log("--- Checking ID/Pass --- Tournament ID:", tId, "User UID:", currentUser?.uid);
            // MODIFIED: Check if user has joined based on 'joinedTournaments' storing an object
            if (!currentUser || !(userProfile?.joinedTournaments?.[tId] && typeof userProfile.joinedTournaments[tId] === 'object')) {
                console.warn("Client-side check failed: User not joined or not logged in.");
                alert("Join the tournament first or refresh.");
                return;
            }

            // Clear any placeholders before setting new content
            removePlaceholders(elements.roomIdDisplay.closest('.placeholder-glow'));
            removePlaceholders(elements.roomPasswordDisplay.closest('.placeholder-glow'));

            elements.roomIdDisplay.textContent = 'Loading...';
            elements.roomPasswordDisplay.textContent = 'Loading...';
            elements.idPasswordModalInstance.show();
            try {
                const tournamentRef = ref(db, `tournaments/${tId}`);
                console.log("Fetching from path:", `tournaments/${tId}`);
                const s = await get(tournamentRef);
                console.log("Snapshot exists?", s.exists(), "Value:", s.val());

                if (s.exists()) {
                    const tData = s.val();
                    if (tData.showIdPass) {
                        elements.roomIdDisplay.textContent = sanitizeHTML(tData.roomId || 'Not updated yet');
                        elements.roomPasswordDisplay.textContent = sanitizeHTML(tData.roomPassword || 'Not updated yet');
                    } else {
                        elements.roomIdDisplay.textContent = 'Hidden by Admin';
                        elements.roomPasswordDisplay.textContent = 'Hidden by Admin';
                    }
                } else {
                    elements.roomIdDisplay.textContent = 'Not Found';
                    elements.roomPasswordDisplay.textContent = 'Not Found';
                }
            } catch (e) {
                console.error("ID/Pass fetch error:", e);
                elements.roomIdDisplay.textContent = 'Error';
                elements.roomPasswordDisplay.textContent = 'Error';
                alert("Error loading ID/Password.");
            }
        }
        async function handlePolicyClick(event) {
            console.log("Policy link clicked");
            if (!elements.policyModalInstance) {
                console.error("Policy modal instance not found");
                return;
            }
            event.preventDefault();
            const target = event.currentTarget;
            const policyType = target.dataset.policy;
            console.log("Policy type requested:", policyType);
            if (!policyType) return;
            let title = '',
                modalBodyContent = '<div class="text-center p-5"><div class="spinner-border spinner-border-sm"></div></div>';
            elements.policyModalBody.innerHTML = modalBodyContent;
            switch (policyType) {
                case 'privacy':
                    title = 'Privacy Policy';
                    modalBodyContent = appSettings.policyPrivacy || 'Content not available.';
                    break;
                case 'terms':
                    title = 'Terms and Conditions';
                    modalBodyContent = appSettings.policyTerms || 'Content not available.';
                    break;
                case 'refund':
                    title = 'Refund and Cancellation';
                    modalBodyContent = appSettings.policyRefund || 'Content not available.';
                    break;
                case 'fairPlay':
                    title = 'Fair Play Policy';
                    modalBodyContent = appSettings.policyFairPlay || 'Content not available.';
                    break;
                case 'refer':
                    title = 'Refer & Earn';
                    if (!currentUser) {
                        alert("Login to view referral.");
                        return;
                    }
                    const refCode = userProfile.referralCode || 'N/A';
                    const refBonus = appSettings?.referralBonus || 0;
                    const refDesc = appSettings?.referralDescription || `Get ₹${refBonus} when your friend joins using your code.`;
                    modalBodyContent = `<div class="text-center"><h4>Refer Friends!</h4><p class="text-secondary">Share code & earn!</p><div class="my-4 p-3" style="background: var(--primary-bg); border-radius: 8px;"><p class="small text-secondary mb-1">Your Code:</p><h3 class="text-accent referral-code" id="referralCodeDisplay">${sanitizeHTML(refCode)}</h3><div class="mt-3"><button class="btn btn-sm btn-custom btn-custom-secondary me-2 copy-btn" data-target="#referralCodeDisplay"><i class="bi bi-clipboard"></i> Copy</button><button class="btn btn-sm btn-custom btn-custom-secondary" id="shareReferralBtn"><i class="bi bi-share-fill"></i> Share</button></div></div><p class="mt-3 small text-secondary">${sanitizeHTML(refDesc)}</p></div>`;
                    break;
                default:
                    title = 'Info';
                    console.warn("Unknown policy:", policyType);
                    modalBodyContent = '<p>Content unavailable.</p>';
            }
            elements.policyModalTitle.textContent = title;
            if (typeof modalBodyContent === 'string' && policyType !== 'refer') {
                elements.policyModalBody.innerHTML = modalBodyContent.replace(/\n/g, '<br>');
            } else {
                elements.policyModalBody.innerHTML = modalBodyContent;
            }
            console.log("Showing policy modal for:", policyType);
            elements.policyModalInstance.show();
        }

        function setupRealtimeListeners(uid) {
            if (!uid || !db || !currentUser) return;
            detachAllDbListeners(); // Clears currentTournamentListenerKey as well
            console.log("Setting up realtime listener for User Profile:", uid);
            const uRef = ref(db, `users/${uid}`);
            const listFunc = onValue(uRef, (s) => {
                if (currentUser && currentUser.uid === uid) {
                    if (s.exists()) {
                        console.log("Realtime: User Profile Update Received");
                        userProfile = s.val();
                        populateUserInfo(currentUser, userProfile);
                        // No need to call loadMyContests, updateMyContestCounts handles this now
                        updateMyContestCounts();
                        if (currentSectionId === 'wallet-section') loadRecentTransactions();
                        updateNotifBadge();
                        loadAnnouncementTicker();
                    } else {
                        console.warn("User data deleted (realtime) for:", uid);
                        alert("Account data missing or deleted. Logging out.");
                        logoutUser();
                    }
                } else {
                    console.log("Realtime listener fired for a different user or logged-out state. Detaching.");
                    off(uRef, 'value', listFunc);
                }
            }, (e) => {
                console.error("Listener error (user profile):", e);
            });
            dbListeners['userProfile'] = {
                path: `users/${uid}`,
                func: listFunc
            }; // Store path-based listener
        }

        // *** MODIFIED detachAllDbListeners to handle queryObj and path listeners ***
        function detachAllDbListeners() {
            console.log("Detaching listeners:", Object.keys(dbListeners));
            let count = 0;
            for (const k in dbListeners) {
                try {
                    const listenerDetail = dbListeners[k];
                    if (listenerDetail.queryObj && listenerDetail.func) { // For query-based listeners
                        off(listenerDetail.queryObj, 'value', listenerDetail.func);
                        count++;
                    } else if (listenerDetail.path && listenerDetail.func) { // For path-based listeners
                        off(ref(db, listenerDetail.path), 'value', listenerDetail.func);
                        count++;
                    } else {
                        console.warn(`Listener object invalid for key: ${k}, cannot detach.`);
                    }
                } catch (e) {
                    console.error(`Detach error ${k}:`, e);
                }
            }
            dbListeners = {};
            currentTournamentListenerKey = null; // Also reset the specific key for tournament lists
            console.log(`Detached ${count} listeners.`);
        }

        // ADDED: Function to load notice bar content from Firebase


        async function checkSecurityRules() {
            console.log("Checking security rules...");
            try {
                if (!currentUser) {
                    console.log("Security rule check skipped for anonymous user (rely on console).");
                } else if (elements.securityWarning) {
                    elements.securityWarning.style.display = 'none';
                }
            } catch (error) {
                console.log("Security rule check result (expected failure if secure):", error.message);
                if (elements.securityWarning) elements.securityWarning.style.display = 'none';
            }
        }

        // ── Payment Gateway Integration (Dynamic) ─────────────────
        // Reads paymentMethod from appSettings (loaded from Firebase settings/)
        // Manual: shows QR + UPI ID, user uploads screenshot + txnId
        // Gateway: calls Vercel zapupi-order endpoint, redirects to payment URL

        // ── showPaymentStatus helper ───────────────────────────────
        function showPaymentStatus(message, type) {
            const el = elements.paymentStatus;
            if (!el) return;
            if (!message) { el.style.display = 'none'; return; }
            el.innerHTML = message;
            el.className = `alert alert-${type} mt-2`;
            el.style.display = 'block';
        }

        // ── Open Add Money Modal — render UI based on payment method ──
        function openAddMoneyModal() {
            if (!currentUser) { alert('Login karein pehle.'); return; }
            const pm = appSettings.paymentMethod || 'manual';
            renderPaymentModal(pm);
            elements.addAmountModalInstance?.show();
        }

        function renderPaymentModal(pm) {
            const body = document.getElementById('addMoneyDynamicBody');
            if (!body) return;
            if (pm === 'gateway') {
                body.innerHTML = `
                    <div class="pay-user-info" id="payUserInfoEl">
                        <i class="bi bi-person-circle"></i>
                        <div>
                            <div style="font-weight:600;color:var(--text-primary);" id="modalUserEmailEl">${currentUser?.email || ''}</div>
                            <div style="color:var(--text-secondary);font-size:0.78rem;">Paying to Wallet via ZapUPI</div>
                        </div>
                    </div>
                    <div class="form-label" style="font-weight:600;color:var(--text-secondary);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.5px;">Select Amount</div>
                    <div class="pay-amount-grid" id="quickAmountGridEl">
                        <button class="pay-quick-btn" data-amount="10">&#8377;10</button>
                        <button class="pay-quick-btn" data-amount="20">&#8377;20</button>
                        <button class="pay-quick-btn" data-amount="50">&#8377;50</button>
                        <button class="pay-quick-btn" data-amount="100">&#8377;100</button>
                        <button class="pay-quick-btn" data-amount="500">&#8377;500</button>
                        <button class="pay-quick-btn" data-amount="1000">&#8377;1,000</button>
                    </div>
                    <div class="pay-divider">or enter custom amount</div>
                    <div class="mb-3">
                        <input type="number" class="form-control" id="addAmountInput" placeholder="Enter amount (&#8377;)" min="1" style="font-size:1.1rem;font-weight:600;">
                    </div>
                    <button class="pay-now-btn" id="verifyPaymentBtnEl" onclick="submitDepositGateway()">
                        <i class="bi bi-shield-lock-fill"></i> Pay Securely via UPI
                    </button>
                    <div id="paymentStatusEl" class="alert" style="display:none;"></div>
                    <div class="pay-secure-badge"><i class="bi bi-shield-check-fill"></i> 100% Secure &bull; Instant Credit &bull; Powered by ZapUPI</div>`;
                // re-bind quick buttons
                document.querySelectorAll('#quickAmountGridEl .pay-quick-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        document.getElementById('addAmountInput').value = btn.dataset.amount;
                        document.querySelectorAll('#quickAmountGridEl .pay-quick-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                    });
                });
            } else {
                // Manual payment
                const upiId = appSettings.payUpiId || appSettings.upiDetails || '';
                const qrUrl = appSettings.payQrUrl || '';
                const instructions = appSettings.payInstructions || 'Payment karein, screenshot aur Transaction ID enter karein.';
                body.innerHTML = `
                    <div class="pay-user-info">
                        <i class="bi bi-person-circle"></i>
                        <div>
                            <div style="font-weight:600;color:var(--text-primary);">${currentUser?.email || ''}</div>
                            <div style="color:var(--text-secondary);font-size:0.78rem;">Manual Payment</div>
                        </div>
                    </div>
                    ${qrUrl ? `<div class="text-center my-3"><img src="${qrUrl}" style="max-width:180px;border-radius:12px;border:2px solid var(--accent-color);" alt="Payment QR"><p class="small text-secondary mt-2">QR scan karein</p></div>` : ''}
                    ${upiId ? `<div class="mb-3 text-center"><span class="badge" style="background:var(--accent-gradient);color:#070A12;font-size:0.95rem;padding:8px 16px;border-radius:8px;"><i class="bi bi-upc me-1"></i>${upiId}</span><button class="btn btn-sm btn-outline-secondary ms-2 py-0" onclick="navigator.clipboard.writeText('${upiId}').then(()=>this.innerHTML='<i class=\'bi bi-check\'></i>')"><i class="bi bi-clipboard"></i></button></div>` : ''}
                    <p class="small text-secondary text-center">${instructions}</p>
                    <hr style="border-color:var(--border-color);">
                    <div class="form-label" style="font-weight:600;color:var(--text-secondary);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.5px;">Select Amount</div>
                    <div class="pay-amount-grid" id="quickAmountGridEl">
                        <button class="pay-quick-btn" data-amount="10">&#8377;10</button>
                        <button class="pay-quick-btn" data-amount="20">&#8377;20</button>
                        <button class="pay-quick-btn" data-amount="50">&#8377;50</button>
                        <button class="pay-quick-btn" data-amount="100">&#8377;100</button>
                        <button class="pay-quick-btn" data-amount="500">&#8377;500</button>
                        <button class="pay-quick-btn" data-amount="1000">&#8377;1,000</button>
                    </div>
                    <div class="pay-divider">or enter custom amount</div>
                    <div class="mb-3">
                        <input type="number" class="form-control" id="addAmountInput" placeholder="Enter amount (&#8377;)" min="1" style="font-size:1.1rem;font-weight:600;">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" style="font-size:0.85rem;color:var(--text-secondary);">Transaction ID / UTR Number</label>
                        <input type="text" class="form-control" id="manualTxnIdInput" placeholder="Enter Txn ID / UTR">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" style="font-size:0.85rem;color:var(--text-secondary);">Payment Screenshot</label>
                        <input type="file" class="form-control" id="manualScreenshotInput" accept="image/*">
                        <div id="manualUploadStatus" class="small mt-1" style="display:none;"></div>
                    </div>
                    <button class="pay-now-btn" id="verifyPaymentBtnEl" onclick="submitDepositManual()">
                        <i class="bi bi-send-fill"></i> Submit Payment Request
                    </button>
                    <div id="paymentStatusEl" class="alert" style="display:none;"></div>
                    <div class="pay-secure-badge"><i class="bi bi-shield-check-fill"></i> Admin verify karega &bull; Balance credited after approval</div>`;
                // re-bind quick buttons
                document.querySelectorAll('#quickAmountGridEl .pay-quick-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        document.getElementById('addAmountInput').value = btn.dataset.amount;
                        document.querySelectorAll('#quickAmountGridEl .pay-quick-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                    });
                });
            }
        }

        // ── Manual Deposit Submit ──────────────────────────────────
        async function submitDepositManual() {
            if (!currentUser || !db) { alert('Login karein pehle.'); return; }
            const amount = parseFloat(document.getElementById('addAmountInput')?.value);
            const txnId  = (document.getElementById('manualTxnIdInput')?.value || '').trim();
            const fileInput = document.getElementById('manualScreenshotInput');
            const file = fileInput?.files[0];
            const uploadStatusEl = document.getElementById('manualUploadStatus');

            if (isNaN(amount) || amount < 1) { showPaymentStatus('Minimum &#8377;1 amount enter karein.', 'warning'); return; }
            if (!txnId) { showPaymentStatus('Transaction ID / UTR number enter karein.', 'warning'); return; }

            const btn = document.getElementById('verifyPaymentBtnEl');
            if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Submitting...'; }
            showPaymentStatus('<i class="bi bi-hourglass-split me-1"></i> Processing...', 'info');

            try {
                let screenshotUrl = '';

                // Upload screenshot via ImgBB
                if (file) {
                    const imgbbKey = appSettings.imgbbApiKey || '';
                    if (!imgbbKey) {
                        // ImgBB key not set — proceed without screenshot, warn user
                        if (uploadStatusEl) { uploadStatusEl.textContent = '⚠️ Screenshot upload skip hua (ImgBB key nahi).'; uploadStatusEl.style.display = 'block'; uploadStatusEl.style.color = 'orange'; }
                    } else {
                        if (uploadStatusEl) { uploadStatusEl.textContent = '⏳ Screenshot upload ho raha hai...'; uploadStatusEl.style.display = 'block'; uploadStatusEl.style.color = 'var(--text-secondary)'; }
                        try {
                            const fd = new FormData();
                            fd.append('image', file);
                            const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, { method: 'POST', body: fd });
                            const uploadData = await uploadRes.json();
                            if (uploadData.success) {
                                screenshotUrl = uploadData.data.url;
                                if (uploadStatusEl) { uploadStatusEl.textContent = '✅ Screenshot uploaded!'; uploadStatusEl.style.color = 'var(--success-color)'; }
                            } else {
                                if (uploadStatusEl) { uploadStatusEl.textContent = '⚠️ Screenshot upload fail — proceeding without it.'; uploadStatusEl.style.color = 'orange'; }
                            }
                        } catch(uploadErr) {
                            console.warn('Screenshot upload error:', uploadErr);
                            if (uploadStatusEl) { uploadStatusEl.textContent = '⚠️ Screenshot upload error — proceeding without it.'; uploadStatusEl.style.color = 'orange'; }
                        }
                    }
                }

                // Check for duplicate TxnID
                try {
                    const dupSnap = await get(ref(db, 'depositRequests'));
                    if (dupSnap.exists()) {
                        const alreadyExists = Object.values(dupSnap.val()).some(v => v.txnId && v.txnId === txnId && v.userId === currentUser.uid);
                        if (alreadyExists) {
                            showPaymentStatus('&#9888; Yeh Transaction ID pehle se submit ho chuki hai!', 'warning');
                            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="bi bi-send-fill"></i> Submit Payment Request'; }
                            return;
                        }
                    }
                } catch(e) { /* skip dup check on error */ }

                const orderId = 'MAN' + Date.now() + Math.random().toString(36).slice(2,5).toUpperCase();
                await push(ref(db, 'depositRequests'), {
                    userId:           currentUser.uid,
                    userName:         userProfile?.displayName || currentUser.email?.split('@')[0] || 'User',
                    userEmail:        currentUser.email || '',
                    amount:           Number(amount),
                    orderId:          orderId,
                    txnId:            txnId,
                    screenshotUrl:    screenshotUrl,
                    status:           'pending',
                    gateway:          'manual',
                    requestTimestamp: Date.now()
                });

                showPaymentStatus('&#10003; Request submit ho gayi! Admin verify karke balance credit karega.', 'success');
                if (btn) { btn.disabled = false; btn.innerHTML = '<i class="bi bi-send-fill"></i> Submit Payment Request'; }
                // Reset form fields
                if (document.getElementById('addAmountInput')) document.getElementById('addAmountInput').value = '';
                if (document.getElementById('manualTxnIdInput')) document.getElementById('manualTxnIdInput').value = '';
                if (fileInput) fileInput.value = '';
                document.querySelectorAll('#quickAmountGridEl .pay-quick-btn').forEach(b => b.classList.remove('active'));
                setTimeout(() => elements.addAmountModalInstance?.hide(), 2800);
            } catch(e) {
                console.error('Manual deposit error:', e);
                showPaymentStatus('&#10008; Error: ' + (e.message || 'Dobara try karein.'), 'danger');
                if (btn) { btn.disabled = false; btn.innerHTML = '<i class="bi bi-send-fill"></i> Submit Payment Request'; }
            }
        }

        // ── Gateway Deposit Submit (ZapUPI via Vercel) ───────────────
        async function submitDepositGateway() {
            if (!currentUser || !db) { alert('Login karein pehle.'); elements.addAmountModalInstance?.hide(); return; }
            const zapupiUrl = (appSettings.zapupiUrl || '').trim();
            if (!zapupiUrl) { showPaymentStatus('Payment gateway configure nahi hua. Admin se contact karein.', 'danger'); return; }

            const amount = parseFloat(document.getElementById('addAmountInput')?.value);
            if (isNaN(amount) || amount < 1) { showPaymentStatus('Minimum &#8377;1 amount enter karein.', 'warning'); return; }

            const btn = document.getElementById('verifyPaymentBtnEl');
            if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Order Ban Raha Hai...'; }
            showPaymentStatus('<i class="bi bi-hourglass-split me-1"></i> Gateway se connect ho raha hai...', 'info');

            try {
                const orderId = 'WARZ' + Date.now() + Math.random().toString(36).slice(2,5).toUpperCase();
                const redirectUrl = location.origin + location.pathname + '?order_id=' + orderId;

                // Save to Firebase (non-blocking)
                try {
                    await push(ref(db, 'depositRequests'), {
                        userId:           currentUser.uid,
                        userName:         userProfile.displayName || currentUser.email?.split('@')[0],
                        userEmail:        currentUser.email,
                        amount:           amount,
                        orderId:          orderId,
                        status:           'pending',
                        gateway:          'zapupi',
                        requestTimestamp: Date.now()
                    });
                } catch(fbErr) { console.warn('Firebase save skipped:', fbErr.message); }

                localStorage.setItem('wz_pending_payment', JSON.stringify({ orderId, amount, uid: currentUser.uid, ts: Date.now() }));

                // Call Vercel API
                const res = await fetch(zapupiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-api-key': (appSettings.zapupikey || '') },
                    body: JSON.stringify({ order_id: orderId, amount: String(amount), redirect_url: redirectUrl, customer_mobile: userProfile.phone || '' })
                });
                const data = await res.json();

                if (data.success && data.payment_url) {
                    showPaymentStatus('<i class="bi bi-check-circle me-1"></i> Redirect ho raha hai...', 'success');
                    setTimeout(() => { location.href = data.payment_url; }, 400);
                    return;
                }

                throw new Error(data.error || 'Payment URL nahi mila');
            } catch(err) {
                console.error('Gateway deposit error:', err);
                showPaymentStatus('<i class="bi bi-x-circle me-1"></i> ' + (err.message || 'Error. Dobara try karein.'), 'danger');
                if (btn) { btn.disabled = false; btn.innerHTML = '<i class="bi bi-shield-lock-fill me-2"></i> Pay Securely via UPI'; }
            }
        }

        // ── ZapUPI Payment Return Handler ─────────────────────────
        // ZapUPI payment return par sirf depositRequests mein 'paid' status set karo.
        // Balance credit SIRF admin approve karne par hoga (same as manual flow).
        async function checkPaymentReturn() {
            const params  = new URLSearchParams(location.search);
            const orderId = params.get('order_id');
            if (!orderId) return;

            if (!currentUser) {
                const pending = localStorage.getItem('wz_pending_payment');
                if (!pending) localStorage.setItem('wz_pending_payment', JSON.stringify({ orderId, amount: 0, uid: '', ts: Date.now() }));
                return;
            }

            const cleanUrl = new URL(location.href);
            ['order_id','status','payment_status','txn_id'].forEach(p => cleanUrl.searchParams.delete(p));
            history.replaceState({}, '', cleanUrl.toString());

            showLoader(true);
            try {
                let amount = 0;
                const savedRaw = localStorage.getItem('wz_pending_payment');
                if (savedRaw) {
                    try { const saved = JSON.parse(savedRaw); if (saved.orderId === orderId && saved.amount > 0) amount = saved.amount; } catch(e) {}
                }

                // Get amount from depositRequests if localStorage empty
                let existingKey = null;
                try {
                    const snap = await get(ref(db, 'depositRequests'));
                    if (snap.exists()) {
                        Object.entries(snap.val()).forEach(([k, v]) => {
                            if (v.orderId === orderId && v.userId === currentUser.uid) {
                                if (!amount) amount = v.amount || 0;
                                existingKey = k;
                            }
                        });
                    }
                } catch(e) {}

                // Duplicate check — already paid or approved
                if (existingKey) {
                    const dupSnap = await get(ref(db, `depositRequests/${existingKey}/status`));
                    const st = dupSnap.val();
                    if (st === 'paid' || st === 'approved' || st === 'completed') {
                        showLoader(false);
                        localStorage.removeItem('wz_pending_payment');
                        alert('\u2705 Payment pehle se submit ho chuki hai! Admin verify karega.');
                        if (typeof showSection === 'function') showSection('wallet-section');
                        return;
                    }
                }

                // Mark as 'paid' — admin will approve and credit balance
                const updates = {};
                if (existingKey) {
                    updates[`depositRequests/${existingKey}/status`] = 'paid';
                    updates[`depositRequests/${existingKey}/paidAt`] = Date.now();
                    if (amount) updates[`depositRequests/${existingKey}/amount`] = amount;
                    await update(ref(db), updates);
                } else if (amount > 0) {
                    // depositRequest missing — create it so admin can see
                    await push(ref(db, 'depositRequests'), {
                        userId:           currentUser.uid,
                        userName:         userProfile?.displayName || currentUser.email?.split('@')[0] || 'User',
                        userEmail:        currentUser.email || '',
                        amount:           Number(amount),
                        orderId:          orderId,
                        status:           'paid',
                        gateway:          'zapupi',
                        paidAt:           Date.now(),
                        requestTimestamp: Date.now()
                    });
                } else {
                    // Amount unknown — mark pending, admin will manually verify
                    showLoader(false);
                    localStorage.removeItem('wz_pending_payment');
                    alert('Payment ho gayi! Admin verify karega.\nOrder ID: ' + orderId);
                    return;
                }

                localStorage.removeItem('wz_pending_payment');
                showLoader(false);
                alert(`\u2705 Payment received!\n\n\ud83d\udcb0 Amount: \u20b9${amount}\n\ud83c\udff7\ufe0f Order ID: ${orderId}\n\nAdmin verify karega — balance jald credit hoga! \u23f0`);
                if (typeof showSection === 'function') showSection('wallet-section');
            } catch(e) {
                console.error('Payment return error:', e);
                showLoader(false);
                alert('Payment return mein error.\nOrder ID: ' + orderId + '\nAdmin se contact karein.');
            }
        }

                // NEW: Function to compare versions
        function compareVersions(v1, v2) {
            const parts1 = v1.split('.').map(Number);
            const parts2 = v2.split('.').map(Number);
            for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
                const p1 = parts1[i] || 0;
                const p2 = parts2[i] || 0;
                if (p1 > p2) return 1;
                if (p1 < p2) return -1;
            }
            return 0;
        }

        // NEW: Function for update check and display
        async function checkForUpdates() {
            console.log("Checking for app updates...");
            showLoader(true);
            try {
                // CORRECTED PATH HERE: appUpdates/latest
                const updateRef = ref(db, 'appUpdates/latest');
                const snapshot = await get(updateRef);
                if (snapshot.exists()) {
                    const updateInfo = snapshot.val();
                    const latestVersion = updateInfo.latestVersion;
                    const required = updateInfo.required || false;
                    const updateLink = updateInfo.updateLink;
                    const whatsNew = updateInfo.whatsNew || [];

                    // Check if latestVersion is actually a newer version
                    if (compareVersions(latestVersion, currentAppVersion) > 0) {
                        console.log(`New update available: v${latestVersion}. Current: v${currentAppVersion}. Required: ${required}`);
                        isUpdateRequired = required; // Set global flag

                        // Populate update screen
                        if (elements.currentVersionDisplay) elements.currentVersionDisplay.textContent = currentAppVersion;
                        if (elements.latestVersionDisplay) elements.latestVersionDisplay.textContent = latestVersion;
                        if (elements.whatsNewList) {
                            elements.whatsNewList.innerHTML = whatsNew.map(item => `<li>${sanitizeHTML(item)}</li>`).join('');
                        }
                        if (elements.updateNowBtn) {
                            elements.updateNowBtn.onclick = () => {
                                if (updateLink) window.open(updateLink, '_blank');
                                else alert("Update link not available.");
                            };
                        }

                        if (elements.updateLaterBtn) {
                            elements.updateLaterBtn.style.display = required ? 'none' : 'block'; // Hide if mandatory
                            elements.updateLaterBtn.onclick = () => {
                                elements.updateScreen.style.display = 'none';
                                isUpdateRequired = false; // Allow app usage
                                if (currentUser) {
                                    showSection('home-section');
                                } else {
                                    showSection('login-section');
                                }
                            };
                        }

                        // Show the update screen, make it blocking if required
                        if (elements.updateScreen) {
                            elements.updateScreen.style.display = 'flex';
                            // Disable scroll on body if update is mandatory
                            document.body.style.overflow = required ? 'hidden' : 'auto';
                        }

                        // If update is required, prevent further section loading
                        if (required) {
                            // Hide any other active sections
                            elements.sections.forEach(sec => sec.classList.remove('active'));
                            elements.bottomNavItems.forEach(item => item.classList.remove('active'));
                            return true; // Indicate that update screen is being shown and blocking
                        }
                    } else {
                        console.log("App is up to date or older version published."); // Added log for older/same version
                        isUpdateRequired = false;
                        if (elements.updateScreen) elements.updateScreen.style.display = 'none';
                        document.body.style.overflow = 'auto'; // Ensure scroll is enabled
                    }
                } else {
                    console.log("No app update information found in database (appUpdates/latest does not exist)."); // Clarified log
                    isUpdateRequired = false;
                    if (elements.updateScreen) elements.updateScreen.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            } catch (error) {
                console.error("Error checking for updates:", error);
                isUpdateRequired = false;
                if (elements.updateScreen) elements.updateScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            } finally {
                showLoader(false);
            }
            return false; // Indicate that update screen is NOT being shown or blocking
        }

        // NEW: openTournamentUserResultsModal function
        async function openTournamentUserResultsModal(tournamentId, tournamentName) {
            if (!db || !tournamentId || !elements.tournamentUserResultsModalInstance) return;

            console.log(`Opening user results modal for T:${tournamentId}`);
            showLoader(true);
            clearStatusMessage(elements.tournamentUserResultsStatus);
            elements.resultsModalTournamentName.textContent = sanitizeHTML(tournamentName || 'N/A');
            elements.resultsModalTournamentId.textContent = sanitizeHTML(tournamentId);
            elements.tournamentUserResultsTableBody.innerHTML = `<tr><td colspan="3" class="text-center p-3"><div class="spinner-border spinner-border-sm"></div></td></tr>`;

            elements.tournamentUserResultsModalInstance.show();

            try {
                const tournamentRef = ref(db, `tournaments/${tournamentId}`);
                const snapshot = await get(tournamentRef);

                if (!snapshot.exists()) throw new Error(`Tournament ${tournamentId} not found.`);
                const tournamentData = snapshot.val();

                const results = tournamentData.results || {};
                const registeredPlayers = tournamentData.registeredPlayers || {}; // Needed for inGameName

                let tableHtml = '';
                if (Object.keys(results).length === 0) {
                    tableHtml = `<tr><td colspan="3" class="text-center p-3 text-secondary"> Our team will give the winning players the correct amount of winnings, we do not show the results due to players privacy.</td></tr>`;
                } else {
                    const winningPlayers = Object.entries(results)
                        .filter(([, winnings]) => winnings > 0) // Only show players with actual winnings
                        .sort(([, winningsA], [, winningsB]) => winningsB - winningsA); // Sort by winnings descending

                    if (winningPlayers.length === 0) {
                        tableHtml = `<tr><td colspan="3" class="text-center p-3 text-secondary">No players won in this tournament.</td></tr>`;
                    } else {
                        // Fetch user display names if not cached and build rows
                        const playerPromises = winningPlayers.map(async ([uid, winnings]) => {
                            let userDisplayName = 'Unknown User';
                            let userInGameName = 'N/A';

                            // FIX: Ensure fullUserDataCache is declared and used correctly
                            if (fullUserDataCache[uid]) {
                                userDisplayName = fullUserDataCache[uid].displayName || 'N/A';
                            } else {
                                const userSnap = await get(ref(db, `users/${uid}`));
                                if (userSnap.exists()) {
                                    const u = userSnap.val();
                                    fullUserDataCache[uid] = u; // Cache it
                                    userDisplayName = u.displayName || 'N/A';
                                }
                            }
                            // Get in-game name from registeredPlayers, if available
                            userInGameName = registeredPlayers[uid]?.inGameName || 'N/A';

                            return `
                                <tr>
                                    <td>${sanitizeHTML(userDisplayName)} <small class="text-muted" title="${sanitizeHTML(uid)}">(${sanitizeHTML(uid.substring(0, 6))}...)</small></td>
                                    <td>${sanitizeHTML(userInGameName)}</td>
                                    <td class="text-end fw-bold text-success">₹${winnings.toFixed(2)}</td>
                                </tr>
                            `;
                        });
                        tableHtml = (await Promise.all(playerPromises)).join('');
                    }
                }
                elements.tournamentUserResultsTableBody.innerHTML = tableHtml;

            } catch (error) {
                console.error("Error loading tournament user results:", error);
                showStatusMessage(elements.tournamentUserResultsStatus, `Error loading results: ${error.message}`, 'danger', false);
                elements.tournamentUserResultsTableBody.innerHTML = `<tr><td colspan="3" class="text-center p-3 text-danger">Error: ${sanitizeHTML(error.message)}</td></tr>`;
            } finally {
                showLoader(false);
            }
        }



        // ── BONUS HISTORY MODAL ──────────────────────────────
        const BONUS_TYPES = ['signup_bonus','referral_bonus','admin_bonus_add','welcome_bonus','admin_deposit','join_failed_refund','withdraw_failed_refund','withdrawal_refund'];

        function bonusTypeLabel(type) {
            const map = {
                signup_bonus:         { label: 'Sign-up Bonus',      icon: 'bi-person-check-fill', color: '#10D98B' },
                referral_bonus:       { label: 'Referral Bonus',     icon: 'bi-people-fill',       color: '#F0A500' },
                admin_bonus_add:      { label: 'Admin Bonus',        icon: 'bi-shield-fill',       color: '#7C3AED' },
                welcome_bonus:        { label: 'Welcome Bonus',      icon: 'bi-gift-fill',         color: '#10D98B' },
                admin_deposit:        { label: 'Admin Deposit',      icon: 'bi-cash-coin',         color: '#3B82F6' },
                join_failed_refund:   { label: 'Join Refund',        icon: 'bi-arrow-repeat',      color: '#F0A500' },
                withdraw_failed_refund:{ label:'Withdraw Refund',    icon: 'bi-arrow-repeat',      color: '#F0A500' },
                withdrawal_refund:    { label: 'Withdrawal Refund',  icon: 'bi-arrow-counterclockwise', color: '#F0A500' },
            };
            return map[type] || { label: type || 'Bonus', icon: 'bi-star-fill', color: '#F0A500' };
        }

        async function openBonusHistoryModal() {
            if (!currentUser || !db) { alert('Please login first.'); return; }
            const modal = new bootstrap.Modal(elements.bonusHistoryModalEl);
            modal.show();
            const listEl = elements.bonusHistoryList;
            listEl.innerHTML = '<div class="text-center p-4"><div class="spinner-border" style="color:var(--accent-color)" role="status"></div></div>';

            try {
                const snap = await get(ref(db, `transactions/${currentUser.uid}`));
                const all = snap.exists() ? Object.values(snap.val()) : [];

                // Filter only bonus-type transactions
                const bonusTxns = all
                    .filter(t => BONUS_TYPES.includes(t.type) || (t.amount > 0 && !['tournament_join','withdraw_request'].includes(t.type)))
                    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

                if (bonusTxns.length === 0) {
                    listEl.innerHTML = `<div class="text-center p-5 text-secondary"><i class="bi bi-inbox display-4 d-block mb-3"></i>No bonus transactions yet.</div>`;
                    return;
                }

                let html = '';
                bonusTxns.forEach(t => {
                    const { label, icon, color } = bonusTypeLabel(t.type);
                    const amt = `+₹${Math.abs(t.amount || 0).toFixed(2)}`;
                    const time = t.timestamp ? new Date(t.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A';
                    html += `
                    <div style="display:flex;align-items:center;gap:12px;padding:12px 10px;border-bottom:1px solid var(--border-color, #1A2238);">
                        <div style="width:42px;height:42px;border-radius:50%;background:${color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                            <i class="bi ${icon}" style="color:${color};font-size:1.1rem;"></i>
                        </div>
                        <div style="flex:1;min-width:0;">
                            <div style="font-weight:600;font-size:.92rem;">${sanitizeHTML(label)}</div>
                            <div style="font-size:.8rem;color:var(--text-secondary,#8A96B0);margin-top:2px;">${sanitizeHTML(t.description || '')}</div>
                            <div style="font-size:.75rem;color:var(--text-muted-custom,#5A6480);margin-top:2px;">${sanitizeHTML(time)}</div>
                        </div>
                        <div style="font-weight:700;color:#10D98B;font-size:1rem;white-space:nowrap;">${sanitizeHTML(amt)}</div>
                    </div>`;
                });
                listEl.innerHTML = html;

            } catch (e) {
                console.error('Bonus history load failed:', e);
                listEl.innerHTML = `<div class="text-center p-4 text-danger"><i class="bi bi-exclamation-triangle me-2"></i>Could not load history.</div>`;
            }
        }
        // ─────────────────────────────────────────────────────

        function initializeEventListeners() {
            if (!elements) return;
            console.log("Initializing listeners...");
            elements.bottomNavItems?.forEach(item => item.addEventListener('click', (e) => {
                e.preventDefault();
                showSection(item.dataset.section);
            }));
            elements.headerBackBtn?.addEventListener('click', () => showSection('home-section'));

            // Event listeners for tournament tabs (Upcoming, Ongoing, Completed)
            elements.tournamentTabs?.forEach(tab => tab.addEventListener('click', (e) => {
                const s = e.currentTarget.dataset.status;
                elements.tournamentTabs.forEach(t => t.classList.remove('active')); // Deactivate all
                e.currentTarget.classList.add('active'); // Activate clicked tab
                filterTournaments(s); // Filter based on selected status and current view mode
            }));

            // Event listeners for My Contests Navigation Cards
            elements.myContestNavCards?.forEach(card => {
                card.addEventListener('click', () => {
                    const myStatus = card.dataset.myStatus; // e.g., 'upcoming'
                    currentTournamentsView = 'my'; // Set mode to 'my' contests
                    currentTournamentGameId = null; // No specific game selected in 'my' mode

                    // Activate the corresponding tab in the tournaments section
                    elements.tournamentTabs.forEach(t => t.classList.remove('active'));
                    const targetTab = querySel(`.tournament-tabs .tab-item[data-status="${myStatus}"]`);
                    if (targetTab) {
                        targetTab.classList.add('active');
                    } else { // Fallback if for some reason the tab isn't found
                        querySel('.tournament-tabs .tab-item[data-status="upcoming"]')?.classList.add('active');
                    }
                    showSection('tournaments-section');
                });
            });

            elements.loginEmailBtn?.addEventListener('click', loginWithEmail);
            elements.signupEmailBtn?.addEventListener('click', signUpWithEmail);
            elements.showSignupToggleBtn?.addEventListener('click', () => toggleLoginForm(false));
            elements.showLoginToggleBtn?.addEventListener('click', () => toggleLoginForm(true));
            elements.forgotPasswordLink?.addEventListener('click', (e) => {
                e.preventDefault();
                resetPassword();
            });
            elements.logoutProfileBtn?.addEventListener('click', logoutUser);
            elements.policyLinks?.forEach(link => link.addEventListener('click', handlePolicyClick));
            elements.notificationSwitch?.addEventListener('change', (e) => {
                console.log("Notification toggle:", e.target.checked);
            });
            elements.withdrawBtn?.addEventListener('click', handleWithdrawClick);

            elements.bottomNavContactBtn?.addEventListener('click', () => {
                window.open('https://t.me/Application_Developer2', '_blank');
            });

            elements.addAmountWalletBtn?.addEventListener('click', () => {
                openAddMoneyModal();
            });

            if (elements.addAmountModalEl) {
                elements.addAmountModalEl.addEventListener('hidden.bs.modal', () => {
                    if (elements.addAmountInput) elements.addAmountInput.value = '';
                    showPaymentStatus('', '');
                    if (elements.verifyPaymentBtn) {
                        elements.verifyPaymentBtn.disabled = false;
                        elements.verifyPaymentBtn.innerHTML = '<i class="bi bi-shield-lock-fill me-2"></i> Pay Securely via UPI';
                    }
                    // Remove active class from quick amount buttons
                    document.querySelectorAll('.pay-quick-btn').forEach(b => b.classList.remove('active-amount'));
                });
            }

            // Quick amount buttons
            document.getElementById('quickAmountGridEl')?.addEventListener('click', (e) => {
                const btn = e.target.closest('.pay-quick-btn');
                if (!btn) return;
                document.querySelectorAll('.pay-quick-btn').forEach(b => b.classList.remove('active-amount'));
                btn.classList.add('active-amount');
                if (elements.addAmountInput) elements.addAmountInput.value = btn.dataset.amount;
            });

            // NEW: Event listener for the "Verify" button, now calls submitDepositRequest
            // verifyPaymentBtn is rendered dynamically in renderPaymentModal() with onclick

            elements.submitWithdrawRequestBtn?.addEventListener('click', submitWithdrawRequestHandler);
            elements.notificationBtn?.addEventListener('click', () => showSection('notifications-section'));
            document.getElementById('profileAnnouncementsBtnEl')?.addEventListener('click', () => showSection('announcements-section'));
            elements.allTransactionsBtn?.addEventListener('click', openAllTransactionsModal);
            elements.viewEarningsHistoryBtn?.addEventListener('click', openBonusHistoryModal);
            document.body.addEventListener('click', (event) => {
                if (event.target.matches('.copy-btn') || event.target.closest('.copy-btn')) {
                    const btn = event.target.closest('.copy-btn');
                    const targetSelector = btn.dataset.target;
                    if (targetSelector) {
                        copyToClipboard(targetSelector);
                    } else {
                        console.warn("Copy button missing data-target selector.");
                    }
                }
                if (event.target.matches('#shareReferralBtn') || event.target.closest('#shareReferralBtn')) {
                    const cel = getElement('referralCodeDisplay');
                    if (cel) shareReferral(cel.textContent);
                }
            });

            // ADDED: Listener for In-Game Name modal confirm button
            elements.confirmInGameNameBtn?.addEventListener('click', async () => {
                const inGameName = elements.inGameNameInput.value.trim();
                if (!inGameName) {
                    showStatusMessage(elements.inGameNameStatusMessage, 'Please enter your in-game name.', 'warning');
                    return;
                }
                if (pendingJoinTournamentId && pendingJoinTournamentFee !== null) {
                    elements.confirmInGameNameBtn.disabled = true;
                    elements.confirmInGameNameBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';

                    const originalJoinButton = document.querySelector(`.btn-join[data-tournament-id="${pendingJoinTournamentId}"]`);

                    await executeJoinTournamentLogic(pendingJoinTournamentId, pendingJoinTournamentFee, inGameName, originalJoinButton);

                    // Always re-enable the button (success = modal hides, error = user can retry)
                    elements.confirmInGameNameBtn.disabled = false;
                    elements.confirmInGameNameBtn.innerHTML = 'Confirm & Join';

                    // Reset pending variables only on success (modal hidden = success path)
                    // If modal is still open, keep pendingJoinTournamentId so user can retry
                    if (!elements.inGameNameModalEl.classList.contains('show')) {
                        pendingJoinTournamentId = null;
                        pendingJoinTournamentFee = null;
                    }

                } else {
                    console.error("No pending tournament details for join.");
                    showStatusMessage(elements.inGameNameStatusMessage, 'An error occurred. Please try again.', 'danger');
                }
            });

            // Modal Cleanup logic:
            const resetModal = (modalEl, statusEl, titleEl = null, defaultTitle = '', idField = null) => {
                modalEl?.addEventListener('hidden.bs.modal', () => {
                    if (statusEl) clearStatusMessage(statusEl);
                    if (titleEl) titleEl.textContent = defaultTitle;
                    if (idField) idField.value = '';
                    // Specific cleanup for tournament results modal
                    if (modalEl === elements.tournamentUserResultsModalEl) {
                        elements.tournamentUserResultsTableBody.innerHTML = `<tr><td colspan="3" class="text-center p-3"><div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div></td></tr>`;
                    }
                    // Specific cleanup for ID/Pass modal
                    if (modalEl === elements.idPasswordModalEl) { // Corrected: Use idPasswordModalEl directly
                        elements.roomIdDisplay.innerHTML = '<span class="placeholder col-6"></span>';
                        elements.roomPasswordDisplay.innerHTML = '<span class="placeholder col-6"></span>';
                    }
                });
            };
            resetModal(elements.loginSection, elements.loginStatusMessage); // Note: Login section is a section, not a modal but reuse this pattern
            resetModal(elements.inGameNameModalEl, elements.inGameNameStatusMessage);
            resetModal(elements.tournamentUserResultsModalEl, elements.tournamentUserResultsStatus, elements.tournamentUserResultsModalTitle, 'Tournament Results');
            resetModal(elements.idPasswordModalEl, null, null, null); // No specific status area for this one, and no form to reset

            console.log("Listeners initialized.");
        }

        document.addEventListener('DOMContentLoaded', () => {
            console.log("DOM Loaded. Init App...");
            if (typeof initializeApp !== 'function' || !auth || !db) {
                console.error("Firebase SDK failed/not ready. Cannot proceed.");
                return;
            }
            showLoader(true);
            loadAppSettings()
                .then(async () => { // Make this callback async
                    console.log("Settings loaded, checking for updates...");
                    // Call checkForUpdates and await its result
                    const updateBlocking = await checkForUpdates();
                    if (!updateBlocking) { // If update is NOT blocking, proceed with normal initialization
                        console.log("No blocking update, initializing listeners and auth state...");
                        initializeEventListeners();
                        updateGlobalUI(false); // Update UI state for logged out
                        onAuthStateChanged(auth, handleAuthStateChange); // This will call handleAuthStateChange
                    } else {
                        console.log("Mandatory update detected. App blocked.");
                        // The update screen is already shown by checkForUpdates
                        // No need to show other sections or set up auth listeners immediately
                        // User will be prompted to update. Once they do, they'll restart the app.
                    }
                })
                .catch(err => {
                    console.error("CRITICAL: Initial settings load failed:", err);
                    alert("Error loading essential app settings. Please try again later.");
                    initializeEventListeners();
                    updateGlobalUI(false);
                    onAuthStateChanged(auth, handleAuthStateChange);
                });
        });

// ── Expose functions to global scope (required for onclick in HTML) ──
window.submitDepositManual  = submitDepositManual;
window.submitDepositGateway = submitDepositGateway;
window.openAddMoneyModal    = openAddMoneyModal;
window.renderPaymentModal   = renderPaymentModal;