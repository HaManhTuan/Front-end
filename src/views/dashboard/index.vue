<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24">
        <aside>
          The guide page is useful for some people who entered the project for the first time. You can briefly introduce the
          features of the project. Demo is based on
        </aside>
        <div class="information">
          <div class="date-content">
            <h4><span class="span-primary"> Ngày: </span></h4>
          </div>
          <div class="car-box">
            <el-row :gutter="20">
              <el-col v-for="(item, key) in dataCarConvert" :key="key" :xs="4" :sm="4" :md="5" :lg="5" :xl="24">
                <div class="car-2 car">
                  <div class="car-detail">
                    <div class="mb-15"> Car: <span class="span-success">{{ item.car.name }}</span> </div>
                    <div class="mb-15"> Phone: <span>{{ item.car.phone }}</span> </div>
                    <div class="mb-15"> Staff: <span> {{ item.staff.name }} </span> </div>
                    <div class="mb-15"> Assistant: <span> {{ item.assistant.name }} </span> </div>
                    <div class="mb-15"> From: <span>{{ item.schedule.from }}</span> </div>
                    <div class="mb-15"> To: <span>{{ item.schedule.to }}</span> </div>
                    <div class="mb-15"> Seat: <span class="span-warning">0 / {{ item.car.seat }}</span> </div>
                  </div>
                  <div class="plane" :class="item.car.seat === 4 ? 'car-4' : ''">
                    <div class="cockpit" />
                    <div class="exit exit--front fuselage" />
                    <div class="cabin fuselage">
                      <div :class="item.car.seat === 4 ? 'seats-4' : 'seats'">
                        <div v-for="(seat, ind) in item.seat" :key="`seat-order-${seat.id}`" class="text-center">
                          <el-checkbox
                            v-model="seat.checked"
                            :label="seat.id"
                            :disabled="item.car.seat === 4 && seat.seat_id === '1'"
                            class="seat"
                            @change="orderSeat(seat, item, $event, key, ind)"
                          >{{ seat.seat_id }}</el-checkbox>
                        </div>
                      </div>
                    </div>
                    <div class="exit exit--back fuselage" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-dialog
        title="Trip"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="closePopup"
      >
        <el-form label-width="100px" :model="formOrder">
          <el-form-item label="Name" :error="errors.name">
            <el-input v-model="formOrder.custom_name" />
          </el-form-item>
          <el-form-item label="Phone" :error="errors.phone">
            <el-input v-model="formOrder.phone" />
          </el-form-item>
          <el-form-item label="Phone" :error="errors.from">
            <el-input v-model="formOrder.from" disabled />
          </el-form-item>
          <el-form-item label="To" :error="errors.to">
            <el-input v-model="formOrder.to" disabled />
          </el-form-item>
          <el-form-item label="Trip">
            <el-input v-model="formOrder.trip" disabled />
          </el-form-item>
          <el-form-item label="Seat">
            <el-input v-model="formOrder.seat" disabled />
          </el-form-item>
          <el-form-item label="Car">
            <el-input v-model="formOrder.car" disabled />
          </el-form-item>
          <el-form-item label="Time From">
            <el-input v-model="formOrder.time_from" disabled />
          </el-form-item>
          <el-form-item label="Time To">
            <el-input v-model="formOrder.time_to" disabled />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closePopup">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
        </span></el-dialog>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getListTripCarStaff } from '@/api/trip-car-staff'
import constants from '@/utils/constants'
import messageUtils from '@/mixins/messageUtils'

export default {
  name: 'Dashboard',
  mixins: [messageUtils],
  data() {
    return {
      currentRole: 'adminDashboard',
      checkboxGroup1: [],
      dataTripCarStaff: [],
      loading: false,
      selected: [],
      dialogVisible: false,
      formOrder: {},
      formOld: {},
      orderSuccess: false
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    dataCarConvert() {
      return this.dataTripCarStaff.map((item) => {
        item.seat.map(data => {
          data.checked = !!(data.status && data.customer_id)
        })
        return item
      })
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    async init() {
      await getListTripCarStaff().then(res => {
        if (res.status === constants.HTTP.OK && res.data.data) {
          this.dataTripCarStaff = res.data.data.data
        }
      }).catch(() => {
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    },
    closePopup() {
      this.formOrder = {}
      if (Object.keys(this.formOld).length > 1 && !this.orderSuccess) {
        this.dataCarConvert[this.formOld.key].seat[this.formOld.index].checked = false
      }
      this.dialogVisible = false
    },
    orderSeat(seat, trip, e, key, index) {
      this.formOld = {
        key: key,
        index: index
      }
      this.formOrder.trip = trip.trip.name
      this.formOrder.from = trip.trip.from
      this.formOrder.to = trip.trip.to
      this.formOrder.car = trip.car.license_plates
      this.formOrder.seat_id = seat.id
      this.formOrder.trip_staff_id = trip.id
      this.formOrder.seat = 'Seat number: ' + seat.seat_id
      this.formOrder.time_from = ('Time:' + trip.schedule.from + ' Date:' + trip.schedule.date)
      this.formOrder.time_to = ('Time:' + trip.schedule.to + ' Date:' + trip.schedule.date)
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
}
//.car-box {
//  display: flex;
//  flex-wrap: wrap;
//}
.car {
  width: 100%;
  padding: 20px 0 20px 0;
  border-radius: 10px;
  background: #242435;
  height: 100%;
  position: relative;
  z-index: 5;
  &:before {
    content: "";
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    border-radius: 15px;
    background-image: linear-gradient(100deg,#13131d,#0398ed);
    background-repeat: repeat-x;
    transition: all .5s;
    width: 99%;
    height: 100%;
    z-index: -2;
  }
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #242435;
    position: absolute;
    border-radius: 10px;
    z-index: -1;
  }
  &:hover:before {
    transform: rotate(2deg) translateX(-7px) translateY(11px);
  }
}
.car-detail {
  padding: 0 35px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.0784313725);
}
</style>
