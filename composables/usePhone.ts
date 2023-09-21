import { PhoneAuthProvider, updatePhoneNumber } from 'firebase/auth';

export async function verifyNewNumber(number: any) {
	const phone = usePhone();
	const modal = useModal();
	const useAuth = useUser();

	//hides modal
	phone.value.changePhone = false;
	//Provider of auth
	const provider = new PhoneAuthProvider(useAuth.value);

	//Button cancel animate
	phone.value.buttonCaptcha = false;
	try {
		//verifies new number
		phone.value.verificationId = await provider.verifyPhoneNumber(
			number,
			phone.value.applicationVerifier!
		);
	} catch (err) {}
	//shows modal to enter verification code for new number
	modal.value.show = true;
}

export async function verifyCode(verificationCode: any) {
	console.log(verificationCode);
	const phone = usePhone();
	const modal = useModal();
	const useAuth = useUser();
	//Hides modal
	phone.value.buttonCaptcha = false;
	modal.value.show = false;
	if (verificationCode) {
		//Shows modal for new number

		phone.value.verCode = verificationCode;
		const setPhone = await setPhoneNumber();
		if (!phone.value.newNumber && !phone.value.firstNumber && !setPhone) {
			phone.value.changePhone = true;
		}
	}
}

export async function setPhoneNumber() {
	const phone = usePhone();
	const modal = useModal();
	const useAuth = useUser();
	console.log('cycki');
	modal.value.show = false;
	try {
		//sets phone credentials
		const phoneCredential = await PhoneAuthProvider.credential(
			phone.value.verificationId,
			phone.value.verCode
		);
		// Updates phone number
		await updatePhoneNumber(useAuth.value.currentUser!, phoneCredential);
		//updates phone number before refresh

		if (phone.value.newNumber) {
			phone.value.number = phone.value.newNumber.replace(/\s+/g, '');
		} else if (phone.value.firstNumber) {
			phone.value.number = phone.value.firstNumber.replace(/\s+/g, '');
		}
	} catch (err) {
		phone.value.newNumber = '';
		modal.value.message = err as string;
		modal.value.show = true;
		return err;
	}
}

export async function updatePhone(number: string) {
	const phone = usePhone();
	const modal = useModal();
	const useAuth = useUser();
	number = number.replace(/\s+/g, '');

	//Button animates on Captcha loading
	phone.value.buttonCaptcha = true;
	//Provider of auth
	const provider = new PhoneAuthProvider(useAuth.value);
	try {
		//Starts verification process
		const verify = await phone.value.applicationVerifier!.verify();

		if (verify) {
			phone.value.verificationId = await provider.verifyPhoneNumber(
				number,
				phone.value.applicationVerifier!
			);
		}

		//Shows modal for verification code
		modal.value.message = 'Enter verification code';
	} catch (err) {
		modal.value.message = 'Too many requests!';
	}
	modal.value.show = true;
}

export async function deletePhone() {
	const phone = usePhone();
	const cookieID = useCookie('__token');
	phone.value.buttonCaptcha = false;
	const { data } = await useFetch('/api/deletePhone', {
		method: 'POST',
		body: { cookieID: cookieID.value },
	});
	phone.value.number = '';
}
