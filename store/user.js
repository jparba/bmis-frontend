export const state = () => ({
	validationError: []
})
export const getters = {
	validationError: state => state.validationError
}

export const actions = {
	async updateAccount({commit}, payload) {
		try{
			await this.$api.post(`updateAccount/${payload.id}`, payload.data)
				.then((res) => {
					if(res.data.success) {
						this.$toast.global.success('Account updated successfully')
					}else{
						this.$toast.global.error('Unable to update account')
					}
				})
		}catch(error) {
			const errors = Object.assign({}, error)
			commit('SETVALIDATIONERROR', errors.response.data.errors)
		}
	},
	async changePassword({commit}, payload) {
		try{
			await this.$api.post(`changePassword/${payload.id}`, payload.data)
				.then((res) => {
					if('message' in res.data && !res.data.success) {
						this.$toast.global.error(res.data.message)
					}else if(res.data.success) {
						this.$toast.global.success('Password changed successfully')
					}else{
						this.$toast.global.error('Unable to change password')
					}
				})
		}catch(error) {
			const errors = Object.assign({}, error)
			commit('SETVALIDATIONERROR', errors.response.data.errors)
		}
	},
	async saveResident({commit}, payload) {
		let updateID = payload.update?this.$auth.user.id:''
		try{
			await this.$api.post(`resident/${updateID}`, payload.data)
				.then((res) => {
					// this.$toast.global.error(res.data.message)
					console.log(res)
				})
		}catch(error) {
			const errors = Object.assign({}, error)
			commit('SETVALIDATIONERROR', errors.response.data.errors)
		}
	}
}

export const mutations = {
	SETVALIDATIONERROR: (state, payload) => { state.validationError = payload }
}