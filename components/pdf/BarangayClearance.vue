<template>
    <div class="cert-pdf">
        <div class="head">
            <div><img src="~/assets/img/logo.png" alt="logo"></div>
            <div>
                Republic of the Philippines <br>
                Province of Agusan del Sur <br>
                Munacipality of Bunawan <br>
                <span class="brgy">BARANGAY SAN TEODORO</span> <br>
            </div>
            <div><img src="~/assets/img/logo.png" alt="logo"></div>
        </div>

        <div class="office">OFFICE OF THE BARANGAY CAPTAIN</div>
        <div class="cert-ttl">BARANGAY CLEARANCE</div>

        <div v-if="userData.user" class="content">
            <div class="whom">TO WHOM IT MAY CONCERN</div>
            <p>This is to certify that <span class="bold uppercase">{{ mrOrMs }} {{ userData.user.firstname }} {{ userData.user.lastname }}</span> of legal age, {{ userData.user.civil_status }},  is a bonifide resident of <span class="bold">{{ purok }}</span> Barangay San Teodoro Bunawan Agusan del Sur, known to me personally to be a person of good moral character and reputation in the community.</p>

            <p>Our records shows that {{ heShe }} is not accused of any crime involving moral turpitude nor {{ heShe }} is a member of any subversive organization.</p>

            <p>This clearance is being issued upon the request of the above-named person for <span class="bold">{{ purpose }}</span> and for whatever legal purpose it may serve her best.</p>

            <p>Issued this {{ theDate }} at Barangay San Teodoro Bunawan Agusan del Sur, Philippines.</p>

            <div class="captain">
                <div class="name">{{ userData.brgycapt }}</div>
                <div>Punong Barangay</div>
            </div>

            <!-- <div class="or-no">
                <div class="d-flex">
                    <div>
                        <div class="d-flex">
                            <div>Res. Cert. No</div>
                            <div></div>
                        </div>
                        <div class="d-flex">
                            <div>Issued on</div>
                            <div></div>
                        </div>
                        <div class="d-flex">
                            <div>Issued at</div>
                            <div></div>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex">
                            <div>O.R. No</div>
                            <div></div>
                        </div>
                        <div class="d-flex">
                            <div>Issued on</div>
                            <div></div>
                        </div>
                        <div class="d-flex">
                            <div>Issued at</div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        userData: {
          type: Object,
          default() {
            return {}
          }
        },
    },
    methods: {
        ordinalSuffix(i) {
            let j = i % 10,
                k = i % 100;
            if (j == 1 && k != 11) {
                return i + "st";
            }
            if (j == 2 && k != 12) {
                return i + "nd";
            }
            if (j == 3 && k != 13) {
                return i + "rd";
            }
            return i + "th";
        },
    },
    computed: {
        mrOrMs() {
            if(this.userData.user.resident.gender == 'Male') {
                return 'Mr.'
            }else if(this.userData.user.resident.gender == 'Female' && this.userData.user.resident.civil_status == 'Single'){
                return 'Ms.'
            }else{
                return 'Mrs.'
            }
        },
        purok() {
            let purok = this.userData.user.resident.current_address
            purok = purok.split('/')
            return purok[0]
        },
        heShe() {
            if(this.userData.user.resident.gender == 'Male') {
                return 'he'
            }else{
                return 'she'
            }
        },
        purpose() {
            let purpose = this.userData.purpose
            return purpose.toUpperCase()
        },
        /*signature() {
            if(this.userData.brgycaptSignature) {
                return `${this.$config.laraURL}/officials/${this.userData.brgycaptSignature}`
            }else{
                return false
            }
        },*/
        theDate() {
            let today = new Date();
            let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
            let d = String(today.getDate()).padStart(2, '0');
            let m = months[today.getMonth()]
            let y = today.getFullYear();

            today = `${this.ordinalSuffix(d)} day of ${m}, ${y}`
            return today
        }
    }
}
</script>

<style lang="scss" scoped>
    .cert-pdf{
        padding: 100px;
        .head{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            line-height: 1.5;
            font-size: 18px;
            img{
                width: 80px;
                height: auto;
                position: relative;
            }
            div {
                &:first-child img{
                    left: -20px;
                }
                &:last-child img{
                    left: unset;
                    right: -20px;
                }
            }
            .brgy{
                font-weight: bold;
            }
        }
        .office{
            font-weight: bold;
            margin-top: 20px;
            text-align: center;
        }
        .cert-ttl{
            font-size: 20px;
            font-weight: bold;
            margin-top: 40px;
            text-align: center;
        }
        .content{
            margin-top: 40px;
            line-height: 1.3;
            & > p{
                margin-bottom: 20px;
                text-indent: 40px;
            }
            .whom{
                font-weight: bold;
                margin-bottom: 30px;
            }
            .specimen-sig{
                margin-top: 100px;
                .underline{
                    margin-top: 40px;
                    width: 200px;
                    border-bottom: 1px solid #000;
                }
            }
            .captain{
                margin-top: 150px;
                display: flex;
                flex-direction: column;
                margin-left: auto;
                width: 40%;
                & > div{
                    &.name{
                        font-weight: bold;
                    }
                }
            }
            .note{
                margin-top: 50px;
                & > div:last-child{
                    margin-top: 10px;
                }
            }
        }
    }

    .or-no{
        margin-top: 30px;
        line-height: 1.7;
        & > div {
            flex-basis: 40%;
            justify-content: space-between;
            & > div > div{
                & > div:first-child {
                    width: 110px;
                    position: relative;
                    top:  2px;
                }
                & > div:last-child {
                    width: 160px;
                    border-bottom: 1px solid #000;
                }
            }
            & > div:last-child > div{
                & > div:first-child {
                    width: 80px;
                }
            }
        }
    }

    .bold{ font-weight: bold; }
    .d-flex{ display: flex; }
    .uppercase{ text-transform: uppercase }
</style>