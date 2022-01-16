export default function ({ $auth, redirect, route }) {

	let path = route.path

	if ($auth.loggedIn) {
		if ($auth.user && $auth.user.role == 'user') {
			return redirect('/')
		}

		if ($auth.user && $auth.user.role == 'admin' || $auth.user && $auth.user.role == 'secretary') {
			return redirect('/manage')
		}
	}

}