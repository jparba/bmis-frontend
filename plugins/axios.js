export default function ({$axios, $auth, redirect}, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api/v1/'
  })

  // $axios.onError(error => {
  //   if(error.response.status == 422) {
  //     $auth.logout()

  //     redirect('/login')
  //   }
  // })

  // Inject to context as $api
  inject('api', api)
}