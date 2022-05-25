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
						this.$auth.setUser(res.data.user)
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
		try{
			await this.$api.post(`resident`, payload)
				.then((res) => {
					if(res.data.success) {
						this.$auth.setUser(res.data.user[0])
						this.$toast.global.success(res.data.message)
					}else {
						this.$toast.global.error(res.data.message)
					}
				})
		}catch(error) {
			const errors = Object.assign({}, error)
			commit('SETVALIDATIONERROR', errors.response.data.errors)
		}
	},
	async updatePhoto({commit}, payload) {
		await this.$api.post(`updatePhoto/${payload.id}`, payload.data)
			.then(res => {
				if(res.data.success) {
					this.$auth.setUser(res.data.user[0])
					this.$toast.global.success(res.data.message)
				}else {
					this.$toast.global.error(res.data.message)
				}
			})
	},
}

export const mutations = {
	SETVALIDATIONERROR: (state, payload) => { state.validationError = payload }
}