export const state = () => ({
	residentList: [],
	requestList: [],
	officialList: [],
	brgycapt: [],
	eventAnnouncement: [],
	userList: [],
	validationError: []
})
export const getters = {
	residentList: state => state.residentList,
	requestList: state => state.requestList,
	officialList: state => state.officialList,
	eventAnnouncement: state => state.eventAnnouncement,
	userList: state => state.userList,
	brgycapt: state => state.brgycapt,
	validationError: state => state.validationError
}

export const actions = {
	/*resident*/
	async fetchResidentList({commit}) {
		try{
			await this.$api.get('residentList')
				.then((res) => {
					commit('SETRESIDENTLIST', res.data)
				})
		}catch(error) {
			this.$toast.global.error('Error encountered while fetching resident list')
		}
	},
	async newResident({commit}, payload) {
		try{
			await this.$api.post('newResident', payload)
				.then((res) => {
					console.log(res.data)
					if(res.data.success) {
						this.$toast.global.success(res.data.message)
					}else{
						this.$toast.global.error(res.data.message)
					}
				})
		}catch(error) {
			const errors = Object.assign({}, error)
			commit('SETVALIDATIONERROR', errors.response.data.errors)
		}
	},
	async updateResident({commit}, payload) {
		try{
			await this.$api.post('updateResident', payload)
				.then((res) => {
					if(res.data.success) {
						this.$toast.global.success(res.data.message)
					}else{
						this.$toast.global.error(res.data.message)
					}
				})
		}catch(error) {
			const errors = Object.assign({}, error)
			commit('SETVALIDATIONERROR', errors.response.data.errors)
		}
	},

	/*request*/
	async fetchRequestList({commit}) {
		try{
			await this.$api.get('requestAllList')
				.then((res) => {
					commit('SETREQUESTLIST', res.data)
				})
		}catch(error) {
			this.$toast.global.error('Error encountered while fetching request list')
		}
	},
	async updatePurposeRequest({commit, dispatch}, payload) {
		try{
			await this.$api.post('updatePurposeRequest', payload)
				.then((res) => {
					dispatch('fetchRequestList')
					this.$toast.global.success(res.data.message)
				})
		}catch(error) {
			this.$toast.global.error('Error encountered updating the request purpose')
		}
	},
	async updateStatusRequest({commit, dispatch}, payload) {
		try{
			await this.$api.post('updateStatusRequest', payload)
				.then((res) => {
					dispatch('fetchRequestList')
					this.$toast.global.success(res.data.message)
				})
		}catch(error) {
			this.$toast.global.error('Error encountered updating the request status')
		}
	},

	/*user*/
	async fetchUserList({commit}) {
		try{
			await this.$api.get('userList')
				.then((res) => {
					commit('SETUSERLIST', res.data)
				})
		}catch(error) {
			this.$toast.global.error('Error encountered while fetching request list')
		}
	},
	async verify({commit, dispatch}, payload) {
		try{
			await this.$api.post('verify', payload)
				.then((res) => {
					if(res.data.success) {
						this.$router.currentRoute.name == 'manage-user' ? dispatch('fetchUserList') : ''
						this.$toast.global.success(res.data.message)
					}else{
						this.$toast.global.error(res.data.message)
					}
				})
		}catch(error) {
			this.$toast.global.error('Error encountered while verifying user')
		}
	},

	/*official*/
	async fetchOfficialList({commit}) {
		try{
			await this.$api.get('officialList')
				.then((res) => {
					commit('SETOFFICIALLIST', res.data)
				})
		}catch(error) {
			this.$toast.global.error('Error encountered while fetching official list')
		}
	},
	async newOfficial({commit}, payload) {
		try{
			await this.$api.post('newOfficial', payload)
				.then((res) => {
					if(res.data.success) {
						this.$toast.global.success(res.data.message)
						this.$router.push('/manage/officials')
					}else{
						this.$toast.global.error(res.data.message)
					}
				})
		}catch(error) {
			this.$toast.global.error('Error adding new official')
		}
	},
	async updateOfficial({commit}, payload) {
		try{
			await this.$api.post('updateOfficial', payload)
				.then((res) => {
					if(res.data.success) {
						this.$toast.global.success(res.data.message)
						this.$router.push('/manage/officials')
					}else{
						this.$toast.global.error(res.data.message)
					}
				})
		}catch(error) {
			this.$toast.global.error('Error updating an official')
		}
	},

	/*Event and announcement*/
	async fetchNewEventAnnouncementList({commit}) {
		try{
			await this.$api.get('eventAnnouncementList')
				.then((res) => {
					commit('SETEVENTANNOUNCMENTLIST', res.data)
				})
		}catch(error) {
			this.$toast.global.error('Error encountered while fetching official list')
		}
	},
	async newEventAnnouncement({commit}, payload) {
		try{
			await this.$api.post('newEventAnnouncement', payload)
				.then((res) => {
					if(res.data.success) {
						this.$toast.global.success(res.data.message)
						this.$router.push('/manage/events-announcements')
					}else{
						this.$toast.global.error(res.data.message)
					}
				})
		}catch(error) {
			this.$toast.global.error('Error adding events or announcement')
		}
	},
	async updateEventAnnouncement({commit}, payload) {
		try{
			await this.$api.post('updateEventAnnouncement', payload)
				.then((res) => {
					if(res.data.success) {
						this.$toast.global.success(res.data.message)
						this.$router.push('/manage/events-announcements')
					}else{
						this.$toast.global.error(res.data.message)
					}
				})
		}catch(error) {
			this.$toast.global.error('Error updating events or announcement')
		}
	},

	async fetchBrgyCapt({commit}) {
		try{
			await this.$api.get('getBrgyCapt')
				.then((res) => {
					commit('SETBRGYCAPT', res.data)
				})
		}catch(error) {
			this.$toast.global.error('Error encountered while getting brgy captain')
		}
	},

	async deleteAnnouncement({commit}, payload) {
		try{
			await this.$api.post('deleteAnnouncement', payload)
				.then((res) => {
					this.$toast.global.success(res.data.message)
					commit('DELETEEVENTANNOUNCMENTLIST', payload.index)
				})
		}catch(error) {
			this.$toast.global.error('Error encountered while deleting announcement')
		}
	},

	async hideUnhideAnnouncement({commit, dispatch}, payload) {
		try{
			await this.$api.post('hideUnhideAnnouncement', payload)
				.then((res) => {
					this.$router.currentRoute.name == 'manage-events-announcements' ? dispatch('fetchNewEventAnnouncementList') : ''
					this.$toast.global.success(res.data.message)
				})
		}catch(error) {
			this.$toast.global.error('Error encountered while hide/unhide announcment')
		}
	}
}

export const mutations = {
	SETRESIDENTLIST: (state, payload) => { state.residentList = payload },
	UPDATERESIDENTLIST: (state, payload) => {
		if (payload >= 0){
          state.residentList.splice(payload, 1)
        }
	},
	SETOFFICIALLIST: (state, payload) => { state.officialList = payload },
	SETEVENTANNOUNCMENTLIST: (state, payload) => { state.eventAnnouncement = payload },
	DELETEEVENTANNOUNCMENTLIST: (state, payload) => {
		let filtered = state.eventAnnouncement.filter((item, index) =>{
		        return index != payload;
		    });
		state.eventAnnouncement = filtered
	},
	SETREQUESTLIST: (state, payload) => { state.requestList = payload },
	SETVALIDATIONERROR: (state, payload) => { state.validationError = payload },
	SETUSERLIST: (state, payload) => { state.userList = payload },
	SETBRGYCAPT: (state, payload) => { state.brgycapt = payload },
}