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
        <div class="cert-ttl">CERTIFICATE OF RESIDENCY</div>

        <div v-if="userData.user" class="content">
            <div class="whom">TO WHOM IT MAY CONCERN</div>

            <p>This is to certify that <span class="bold uppercase">{{ mrOrMs }} {{ userData.user.firstname }} {{ userData.user.lastname }}</span> of legal age, {{ userData.user.civil_status }}, filipino citizen, whose specimen siganature appears below, is a <span class="bold">PERMANENT RESIDENT</span> of this Barangay San Teodoro, Bunawan Agusan.</p>

            <p>Based of records of this office, she has been residing at Barangay San Teodoro, Municipality of Bunawan Agusan.</p>

            <p>This <span class="bold">CERTIFICATION</span> is being issued upon the request of the above-named person for whatever legal purpose it may serve.</p>

            <p>Issued this {{ theDate }} at Barangay San Teodoro Bunawan Agusan del Sur, Philippines.</p>

            <div class="specimen-sig">
                <p>Specimen Signature</p>
                <div class="underline"></div>
            </div>

            <div class="captain">
                <div class="name">{{ userData.brgycapt }}</div>
                <div>Punong Barangay</div>
            </div>

            <div class="note">
                <div>Note:</div>
                <div>Not valid without official seal</div>
            </div>
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
            if(this.userData.user.gender == 'Male') {
                return 'Mr.'
            }else if(this.userData.user.gender == 'Female' && this.userData.user.civil_status == 'Single'){
                return 'Ms.'
            }else{
                return 'Mrs.'
            }
        },
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
                margin-top: 30px;
                text-align: right;
                & > div{
                    text-align: right;
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

    .bold{ font-weight: bold; }
    .uppercase{ text-transform: uppercase }
</style>