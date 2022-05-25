export default function ({ $auth, redirect, route }) {

	const path = route.path
	const adminUrl = /^\/manage(\/|$)/.test(path)

	if (!$auth.loggedIn) { return redirect('/login') }
	if ($auth.user.status==0) { return redirect('/accountStatus') }
	if ($auth.loggedIn) {
		if(!adminUrl && $auth.user.role == 'admin' || !adminUrl && $auth.user.role == 'secretary') {
			return redirect('/404')
		}

		if(adminUrl && $auth.user.role == 'user') {
			return redirect('/404')
		}
	}

}