// Loader

let loader = document.querySelector('.loader')

function toggleLoader(){
	loader.classList.toggle('loader--active')
}

// Loader

// Wallets Modal

let wallet = {
	id: '', 
}

let walletInput = document.querySelectorAll('.header__wallets-dfinity-text'),
		headerWallet = document.querySelectorAll('.header__wallets'),
		walletModal = document.querySelectorAll('.wallets'),
		walletCopy = document.querySelectorAll('.header__wallets'),
		quitWalletBtn = document.querySelectorAll('.profile .btn--out'),
		dfinityBtn = document.querySelectorAll('.btn--dfinity'),
		profileModal = document.querySelectorAll('.profile');

async function init() {
	(async () => {
			// Canister Ids
			const nnsCanisterId = 'xpkrh-oyaaa-aaaai-qbgaq-cai'

			// Whitelist
			const whitelist = [
				nnsCanisterId,
			];

		const result = await window.ic.plug.isConnected();
		console.log(`Plug connection is ${result}`);
		console.log(window.ic.plug);
		if (!result) {await window.ic.plug.requestConnect({ whitelist })} else {

						// Get the user principal id
						wallet.id = await window.ic.plug.agent.getPrincipal();

						wallet.id = wallet.id.toString()
			
						for(let i = 0; i < dfinityBtn.length; i++){
							dfinityBtn[i].classList.add('hidden')
						}
					
						let walletMinId = wallet.id.substr(0, 5) + '...' + wallet.id.substr(-4, wallet.id.length)
						for(let i = 0; i < walletInput.length; i++){
							walletInput[i].innerHTML = walletMinId
						}
					
						for(let i = 0; i < headerWallet.length; i++){
							headerWallet[i].classList.toggle('header__wallets--connected')
						}
					
						for(let i = 0; i < profileModal.length; i++){
							profileModal[i].classList.toggle('profile--connected')
						}
					
						for(let i = 0; i < quitWalletBtn.length; i++){
							quitWalletBtn[i].classList.remove('hidden')
						}
		};

		
	  })()
};
init();

function connectWallet(){
	(async () => {
		// try {
		// 	const publicKey = await window.ic.plug.requestConnect();
		// 	console.log(`The connected user's public key is:`, publicKey);
		//   } catch (e) {
		// 	console.log(e);
		//   }

			// Canister Ids
			const nnsCanisterId = 'xpkrh-oyaaa-aaaai-qbgaq-cai'

			// Whitelist
			const whitelist = [
				nnsCanisterId,
			];

			// Make the request
			const isConnected = await window.ic.plug.requestConnect({
				whitelist,
			});

			// Get the user principal id
			wallet.id = await window.ic.plug.agent.getPrincipal();

			wallet.id = wallet.id.toString()

			for(let i = 0; i < dfinityBtn.length; i++){
				dfinityBtn[i].classList.add('hidden')
			}
		
			let walletMinId = wallet.id.substr(0, 5) + '...' + wallet.id.substr(-4, wallet.id.length)
			for(let i = 0; i < walletInput.length; i++){
				walletInput[i].innerHTML = walletMinId
			}
		
			for(let i = 0; i < headerWallet.length; i++){
				headerWallet[i].classList.toggle('header__wallets--connected')
			}
		
			for(let i = 0; i < profileModal.length; i++){
				profileModal[i].classList.toggle('profile--connected')
			}
		
			for(let i = 0; i < quitWalletBtn.length; i++){
				quitWalletBtn[i].classList.remove('hidden')
			}
	})();
};

function quitWallet(){
	for(let i = 0; i < dfinityBtn.length; i++){
		dfinityBtn[i].classList.remove('hidden')
	}

	wallet.id = ''
	for(let i = 0; i < walletInput.length; i++){
		walletInput[i].innerHTML = 'Login'
	}
	for(let i = 0; i < walletModal.length; i++){
		walletModal[i].classList.remove('modal--active')
	}
	for(let i = 0; i < headerWallet.length; i++){
		headerWallet[i].classList.toggle('header__wallets--connected')
	}
	for(let i = 0; i < profileModal.length; i++){
		profileModal[i].classList.toggle('profile--connected')
	}

	for(let i = 0; i < quitWalletBtn.length; i++){
		quitWalletBtn[i].classList.add('hidden')
	}
};

for(let i = 0; i < dfinityBtn.length; i++){
	dfinityBtn[i].addEventListener('click', function(){
		connectWallet()
	});
}

for(let i = 0; i < walletCopy.length; i++){
	walletCopy[i].addEventListener('click', function(e){
		e.stopPropagation()
	
		const el = document.createElement('textarea');
		el.value = wallet.id;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	});
}

// Wallets Modal

// Blockchains Modal

let blockchainItems = document.querySelectorAll('.blockchains__item')
for(let i = 0; i < blockchainItems.length; i++){
	blockchainItems[i].addEventListener('click', function(){
		let input = blockchainItems[i].querySelector('input')
		if(input.value !== 'dfinity'){
			window.open('https://flokicyberpunk.com/game')
		}
	})
}

// Blockchains Modal

// Profile Modal
		
let uploadTrigger = document.querySelectorAll('.upload input'),
		headerProfile = document.querySelectorAll('.header__profile'),
		uploadParent = document.querySelectorAll('.upload'),
		uploadedImg = document.querySelectorAll('.profile__imgwrapper-uploaded img'),
		headerProfileImg = document.querySelectorAll('.header__profile-img'),
		profileSaveBtn = document.querySelectorAll('.header__profile .btn'),

		deleteImgBtn = document.querySelectorAll('.profile__imgwrapper--delete'),
		usernameInput = document.querySelectorAll('.profile__form .input')

let user = {
	logo: {
		src: '',
	},
	username: '',
};

let notSavedUser = {
	logo: {
		src: '',
	},
	username: '',
}

for(let i = 0; i < uploadTrigger.length; i++){
	uploadTrigger[i].addEventListener('change', function(event){
		if (event.srcElement.files.length !== 0){
			let newFile = event.target.files[0]
			notSavedUser.logo.src = URL.createObjectURL(newFile);
			
			for(let i = 0; i < uploadParent.length; i++){
				uploadParent[i].classList.add('uploaded')
			}
			for(let i = 0; i < uploadedImg.length; i++){
				uploadedImg[i].src = notSavedUser.logo.src
			}
		}
	})
}

for(let i = 0; i < quitWalletBtn.length; i++){
	quitWalletBtn[i].addEventListener('click', function(){
		quitWallet()
	});
}

function saveUserSettings(){
	notSavedUser.username = usernameInput.value
	user = notSavedUser

	// SEND DATA SOMEWHERE

	if(notSavedUser.logo.src !== ''){
		for(let i = 0; i < headerProfileImg.length; i++){
			headerProfileImg[i].src = user.logo.src
		}
		for(let i = 0; i < headerProfile.length; i++){
			headerProfile[i].classList.add('header__profile--uploaded')
		}
	}
};

for(let i = 0; i < profileSaveBtn.length; i++){
	profileSaveBtn[i].addEventListener('click', function(){
		saveUserSettings()
		closeAllModals()
	});
}

for(let i = 0; i < deleteImgBtn.length; i++){
	deleteImgBtn[i].addEventListener('click', function(e){
		for(let i = 0; i < uploadParent.length; i++){
			uploadParent[i].classList.remove('uploaded')
		}
		e.preventDefault()
		notSavedUser.logo.src = ''
		for(let i = 0; i < uploadedImg.length; i++){
			uploadedImg[i].src = notSavedUser.logo.src
		}
		for(let i = 0; i < headerProfile.length; i++){
			headerProfile[i].classList.remove('header__profile--uploaded')
		}
		for(let i = 0; i < headerProfileImg.length; i++){
			headerProfileImg[i].src = 'images/user.svg'
		}
	});
}

// Profile Modal

// All modals

let modalTriggers = document.querySelectorAll('.modal-trigger'),
		modals = document.querySelectorAll('.modal'),
		modalPads = document.querySelectorAll('.modal-pad')

function closeAllModals(){
	for(let i = 0; i < modals.length; i++){
		modals[i].classList.remove('modal--active')
	}
};

function closeAllModalsWithoutClicked(modal){
	for(let i = 0; i < modals.length; i++){
		if(modal !== modals[i]){
			modals[i].classList.remove('modal--active')
		}
	}
};

for(let i = 0; i < modalTriggers.length; i++){
	modalTriggers[i].addEventListener('click', function(){

		let modal = modalTriggers[i].querySelector('.modal')
		closeAllModalsWithoutClicked(modal)

		if(modalTriggers[i].classList.contains('header__wallets') && wallet.id === ''){
			connectWallet()
		}else if(modalTriggers[i].classList.contains('header__wallets') && wallet.id !== '' ){
			modal.classList.add('modal--active')
			setTimeout(function(){
				modal.classList.remove('modal--active')
			}, 3000);
		}else if(modal.classList.contains('modal--active')){
			modal.classList.remove('modal--active')
		}else{
			modal.classList.add('modal--active')
		}
	});
}

for(let i = 0; i < modals.length; i++){
	modals[i].addEventListener('click', function(e){
		e.stopPropagation()
	});
}

for(let i = 0; i < modalPads.length; i++){
	modalPads[i].addEventListener('click', function(e){
		closeAllModals()
		e.stopPropagation()
	});
}

// All modals

// Mobile menu

let menuTrigger = document.querySelector('.header__menu-btn'),
		menu = document.querySelector('.header__menu')

menuTrigger.addEventListener('click', function(){
	menu.classList.toggle('header__menu--active')
})

// Mobile menu