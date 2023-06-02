export default defineNuxtRouteMiddleware(async (to, from) => {
	const test = useCookie('token');
	let firebase;
	await $fetch('/api/ser', { method: 'POST', body: { test: test.value } }).then(
		(set) => {
			console.log('fetch');
			return (firebase = set);
		}
	);
	if (firebase) {
		if (to.path !== '/browse') {
			return navigateTo('/browse');
		}
	} else if (!firebase && to.path === '/browse') {
		return navigateTo('/login');
	}
});
