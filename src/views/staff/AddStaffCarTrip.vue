<template>
  <div class="container-staff">
    <div class="title-content">
      <el-row :gutter="20">
        <el-col :span="8">
          <h3 class="title-text">Add Trip Car Staff</h3>
        </el-col>
        <el-col :span="16">
          <h3 class="title-text">List Trip Car Staff</h3>
        </el-col>
      </el-row>
    </div>
    <div class="content-staff">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form label-width="120px" :model="formData">
            <el-form-item label="Trip" :error="errors.trip_id">
              <el-select v-model="formData.trip_id" @change="changeTrip">
                <el-option
                  v-for="item in optionTrip"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Schedule" :error="errors.schedule_id">
              <el-date-picker v-model="formData.datetime" type="date" format="dd-MM-yyyy" value-format="dd-MM-yyyy" class="mbt-20" @change="changeDate" />
              <el-select v-model="formData.schedule_id" @change="changeSchedule">
                <el-option
                  v-for="item in optionSchedule"
                  :key="`schedule-${item.id}`"
                  :label="`${item.from} - ${item.to}`"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Name" :error="errors.name">
              <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="Staff" :error="errors.staff_id">
              <el-select v-model="formData.staff_id">
                <el-option
                  v-for="item in optionStaff"
                  :key="`staff-${item.id}`"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Assistant Driver" :error="errors.assistant_driver_id">
              <el-select v-model="formData.assistant_driver_id">
                <el-option
                  v-for="item in optionAssistantDriver"
                  :key="`assistant-${item.id}`"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Type Car" :error="errors.type_car_id">
              <el-select v-model="formData.type_car_id" @change="changeTypeCar">
                <el-option
                  v-for="item in optionTypeCar"
                  :key="`type-carr-${item.id}`"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Car" :error="errors.car_id">
              <el-select v-model="formData.car_id">
                <el-option
                  v-for="item in optionCar"
                  :key="`car-${item.id}`"
                  :label="`${item.name} - BS: ${item.license_plates}`"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="createTripCar">Create</el-button>
              <el-button type="danger" @click="$router.push('/dashboard')">Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="16">
          <div class="table-box">
            <el-table
              :data="dataTripCarStaff"
              :loading="loading"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="id"
                label="ID"
                width="50"
              />
              <el-table-column
                label="Trip"
              >
                <template slot-scope="scope">
                  <p>{{ scope.row.trip.name || '' }}</p>
                  <p>Time: {{ scope.row.schedule.from + ' - ' + scope.row.schedule.to }}</p>
                  <p>Date: {{scope.row.schedule.date }}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="Schedule"
                width="150"
              >
                <template slot-scope="scope">
                  <p>Time: {{ scope.row.schedule.from + ' - ' + scope.row.schedule.to }}</p>
                  <p>Date: {{ scope.row.schedule.date }}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="Car"
              >
                <template slot-scope="scope">
                  <p>{{ scope.row.car.name + ' **** ' + scope.row.car.license_plates }}</p>
                  <p>Staff: {{ scope.row.staff.name + ' - ' + scope.row.staff.phone}}</p>
                  <p>Assistant: {{ scope.row.assistant.name + ' - ' + scope.row.assistant.phone}}</p>
                </template>
              </el-table-column>
              <el-table-column
                align="left"
                label="Action"
                width="150"
              >
                <template>
                  <el-button type="primary" icon="el-icon-edit" />
                  <el-button type="danger" icon="el-icon-delete" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import messageUtils from '@/mixins/messageUtils'
import { getListTrip } from '@/api/trip'
import constants from '@/utils/constants'
import { getListAssistant, getListStaff } from '@/api/staff'
import { getListSchedule } from '@/api/schedule'
import { getListTypeCar } from '@/api/type-car'
import { getListCar } from '@/api/car'
import { createTripCarStaff, getListTripCarStaff } from '@/api/trip-car-staff'
import { Message } from 'element-ui'

export default {
  name: 'AddStaffCarTrip',
  mixins: [messageUtils],
  data() {
    return {
      loading: false,
      formData: {},
      optionTrip: [],
      optionStaff: [],
      optionAssistantDriver: [],
      optionTypeCar: [],
      optionSchedule: [],
      optionCar: [],
      dataTripCarStaff: []
    }
  },
  watch: {
    'formData.staff_id': function(data) {
      if (data && this.formData.schedule_id) {
        getListAssistant(data, { option: true, schedule_id: this.formData.schedule_id }).then(res => {
          if (res.status === constants.HTTP.OK && res.data.data) {
            this.optionAssistantDriver = res.data.data
          }
        }).catch(() => { this.optionAssistantDriver = [] })
      }
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    async init() {
      await getListTrip().then(res => {
        if (res.status === constants.HTTP.OK && res.data.data) {
          this.optionTrip = res.data.data.data
        }
      }).catch(() => { this.optionTrip = [] })
      await getListTypeCar().then(res => {
        if (res.status === constants.HTTP.OK && res.data.data) {
          this.optionTypeCar = res.data.data.data
        }
      }).catch(() => { this.optionTypeCar = [] })
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
    async changeDate(data) {
      if (data) {
        if (this.formData.trip_id) {
          await this.getOptionSchedule(this.formData.trip_id, data)
        }
      }
    },
    async changeTrip(data) {
      if (data) {
        if (this.formData.datetime) {
          await this.getOptionSchedule(data, this.formData.datetime)
        }
      }
    },
    async changeSchedule(data) {
      if (data) {
        await getListStaff({ option: true, schedule_id: data }).then(res => {
          if (res.status === constants.HTTP.OK && res.data.data) {
            this.optionStaff = res.data.data.data
          }
        }).catch(() => { this.optionStaff = [] })
        if (this.formData.type_car_id) {
          await this.getOptionCar(data, this.formData.type_car_id)
        }
      }
    },
    async changeTypeCar(data) {
      if (data && this.formData.schedule_id) {
        await this.getOptionCar(this.formData.schedule_id, data)
      }
    },
    async getOptionSchedule(trip_id, date) {
      await getListSchedule({
        trip_id: trip_id,
        datetime: date
      }).then(res => {
        if (res.status === constants.HTTP.OK && res.data.data) {
          this.optionSchedule = res.data.data.data
        }
      }).catch(() => {
        this.optionSchedule = []
      })
    },
    async getOptionCar(schedule_id, type_car_id) {
      await getListCar({ option: true, schedule_id: schedule_id, type_car_id: type_car_id }).then(res => {
        if (res.status === constants.HTTP.OK && res.data.data) {
          this.optionCar = res.data.data.data
        }
      }).catch(() => { this.optionCar = [] })
    },
    async createTripCar() {
      await createTripCarStaff(this.formData).then(res => {
        if (res.status === constants.HTTP.OK) {
          this.dialogVisibleCar = false
          Message.success('Create Trip Car Successfully')
          this.formData = {}
          this.init()
        }
      }).catch(err => {
        if (err.data.errors) this.errors = err.data.errors
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container-staff {
  padding: 32px;
  position: relative;
}
.content-staff{
  margin-top: 50px;
}
.title-text {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  transition-delay: .15s;
}

.el-form-item--medium::v-deep .el-form-item__content {
  width: 300px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
.el-select::v-deep {
  width: 100%;
}
.mbt-20 {
  margin-bottom: 20px;
}

</style>
