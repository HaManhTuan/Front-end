<template>
  <div class="container-car">
    <div class="title-content">
      <h3 class="title-text">Manage Type Car And Cars</h3>
    </div>
    <div class="content-car">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="type-car-content">
            <el-row>
              <el-col :span="24">
                <div class="btn-box">
                  <el-button type="success" icon="el-icon-plus" @click="showPopupTypeCar">Add Type Car</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="table-box">
                  <el-table
                    :data="typeCar"
                    :loading="loadingTypeCar"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="id"
                      label="ID"
                      width="50"
                    />
                    <el-table-column
                      label="Name"
                    >
                      <template slot-scope="{row}">
                        <span> {{ row.name + ' (' + row.car.length +' xe)' }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="left"
                      label="Action"
                      width="150"
                    >
                      <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEditTypeCar(scope.$index, scope.row)" />
                        <el-button type="danger" icon="el-icon-delete" @click="handleDeleteTypeCar(scope.$index, scope.row)" />
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
            <el-dialog
              :title="titlePopupTypeCar"
              :visible.sync="dialogVisibleTypeCar"
              width="30%"
              :before-close="closePopupTypeCar"
            >
              <el-form label-width="100px" :model="formTypeCar">
                <el-form-item label="Name" :error="errors.name">
                  <el-input v-model="formTypeCar.name" />
                </el-form-item>
                <el-form-item label="Description" :error="errors.description">
                  <el-input v-model="formTypeCar.description" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="createTypeCar(isEditTypeCar)">{{ titleButton }}</el-button>
                  <el-button @click="closePopupTypeCar">Cancel</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="car-content">
            <el-row>
              <el-col :span="24">
                <div class="btn-box">
                  <el-button type="success" icon="el-icon-plus" @click="showPopupCar">Add Car</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="table-box">
                  <el-table
                    :data="car"
                    :loading="loadingCar"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="id"
                      label="ID"
                      width="50"
                    />
                    <el-table-column
                      prop="name"
                      label="Name"
                    />
                    <el-table-column
                      prop="license_plates"
                      label="License Plates"
                    />
                    <el-table-column
                      prop="color"
                      label="Color"
                    />
                    <el-table-column
                      label="Type Car"
                    >
                      <template slot-scope="{row}">
                        <span>{{ row.type_car.name }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="seat"
                      label="Seat"
                      width="80"
                    />
                    <el-table-column
                      align="left"
                      label="Action"
                      width="150"
                    >
                      <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEditCar(scope.$index, scope.row)" />
                        <el-button type="danger" icon="el-icon-delete" @click="handleDeleteCar(scope.$index, scope.row)" />
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-dialog
                  :title="titlePopupCar"
                  :visible.sync="dialogVisibleCar"
                  width="40%"
                  :before-close="closePopupCar"
                >
                  <el-form label-width="120px" :model="formCar">
                    <el-form-item label="Name" :error="errors.name">
                      <el-input v-model="formCar.name" />
                    </el-form-item>
                    <el-form-item label="License Plates" :error="errors.license_plates">
                      <el-input v-model="formCar.license_plates" />
                    </el-form-item>
                    <el-form-item label="Color" :error="errors.color">
                      <el-input v-model="formCar.color" />
                    </el-form-item>
                    <el-form-item label="Seat" :error="errors.seat">
                      <el-input v-model="formCar.seat" type="number" />
                    </el-form-item>
                    <el-form-item label="Type Car" :error="errors.type_car_id">
                      <el-select v-model="formCar.type_car_id" placeholder="Select Type Car">
                        <el-option v-for="item in selectTypeCar" :key="`option-${item.id}`" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="createCar(isEditCar)">{{ titleButtonCar }}</el-button>
                      <el-button @click="closePopupCar">Cancel</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import { getListTypeCar, createTypeCar, editTypeCar } from '@/api/type-car'
import { getListCar, editCar, createCar } from '@/api/car'
import constants from '@/utils/constants'
import messageUtils from '@/mixins/messageUtils'
import { Message } from 'element-ui'

export default {
  name: 'Index',
  mixins: [messageUtils],
  data() {
    return {
      typeCar: [],
      car: [],
      keyword: null,
      loadingPage: false,
      loadingTypeCar: false,
      loadingCar: false,
      dialogVisibleTypeCar: false,
      dialogVisibleCar: false,
      formTypeCar: {
        name: null,
        description: null
      },
      formCar: {
        name: null,
        license_plates: null,
        color: null,
        seat: null,
        type_car_id: null
      },
      titlePopupTypeCar: null,
      titlePopupCar: null,
      titleButton: null,
      titleButtonCar: null,
      isEditTypeCar: false,
      isEditCar: false,
      selectTypeCar: []
    }
  },
  async created() {
    await this.initData()
  },
  methods: {
    async initData() {
      this.formTypeCar = {}
      this.isEditTypeCar = false
      this.isEditCar = false
      this.loadingTypeCar = true
      this.loadingCar = true
      await getListTypeCar().then(res => {
        if (res.status === constants.HTTP.OK && res.data.data) {
          this.typeCar = res.data.data.data
          this.selectTypeCar = res.data.data.data
        }
      }).catch(() => {
        this.loadingTypeCar = false
      }).finally(() => {
        this.loadingTypeCar = false
      })
      await getListCar().then(res => {
        if (res.status === constants.HTTP.OK && res.data.data) {
          this.car = res.data.data.data
        }
      }).catch(() => {
        this.loadingCar = false
      }).finally(() => {
        this.loadingCar = false
      })
    },
    async handleEditTypeCar(key, data) {
      this.titlePopupTypeCar = 'Edit Type Car'
      this.dialogVisibleTypeCar = true
      this.formTypeCar = { ...data }
      this.isEditTypeCar = true
      this.titleButton = 'Edit'
    },
    handleDeleteTypeCar(key, data) {

    },
    keyDown(data) {

    },
    showPopupTypeCar(type = null, data = null) {
      this.formTypeCar = {}
      this.isEditTypeCar = false
      this.titlePopupTypeCar = 'Create Type Car'
      this.dialogVisibleTypeCar = true
      this.titleButton = 'Create'
    },
    showPopupCar(type = null, data = null) {
      this.formCar = {}
      this.isEditCar = false
      this.titlePopupCar = 'Create Type Car'
      this.dialogVisibleCar = true
      this.titleButtonCar = 'Create'
    },
    async createTypeCar(type = null) {
      if (type) {
        await editTypeCar(this.formTypeCar.id, this.formTypeCar).then(res => {
          if (res.status === constants.HTTP.OK) {
            this.dialogVisibleTypeCar = false
            Message.success('Edit Type Car Successfully')
            this.initData()
          }
        }).catch((err) => {
          this.isEditTypeCar = false
          if (err.data.errors) this.errors = err.data.errors
        })
      } else {
        await createTypeCar(this.formTypeCar).then(res => {
          if (res.status === constants.HTTP.OK) {
            this.dialogVisibleTypeCar = false
            Message.success('Create Type Car Successfully')
            this.initData()
          }
        }).catch((err) => {
          if (err.data.errors) this.errors = err.data.errors
        })
      }
    },
    closePopupTypeCar() {
      this.isEditTypeCar = false
      this.dialogVisibleTypeCar = false
      this.formTypeCar = {}
      this.errors = {}
    },
    closePopupCar() {
      this.isEditCar = false
      this.dialogVisibleCar = false
      this.formCar = {}
      this.errors = {}
    },
    handleEditCar(key, data) {
      this.titlePopupCar = 'Edit Car'
      this.dialogVisibleCar = true
      this.formCar = { ...data }
      this.isEditCar = true
      this.titleButtonCar = 'Edit'
    },
    handleDeleteCar(key, data) {

    },
    async createCar(type = null) {
      if (type) {
        await editCar(this.formCar.id, this.formCar).then(res => {
          if (res.status === constants.HTTP.OK) {
            this.dialogVisibleCar = false
            Message.success('Edit Car Successfully')
            this.initData()
          }
        }).catch((err) => {
          this.isEditCar = false
          if (err.data.errors) this.errors = err.data.errors
        })
      } else {
        await createCar(this.formCar).then(res => {
          if (res.status === constants.HTTP.OK) {
            this.dialogVisibleCar = false
            Message.success('Create Car Successfully')
            this.initData()
          }
        }).catch((err) => {
          if (err.data.errors) this.errors = err.data.errors
        })
      }
    }
  }
}
</script>

<style scoped>
  .container-car {
    padding: 32px;
    position: relative;
  }
  .title-content {
    margin: 30px 0;
  }
  .content-car{
    margin-top: 50px;
  }
  .type-car-content{
    position: relative;
    /*background: rgb(240, 240, 240);*/
    height: 100%;
  }
  .car-content{
    position: relative;
    height: 100%;
  }
  .btn-box {
    padding: 20px;
  }
  .table-box {
    padding: 20px;
  }
  .title-text {
    color: #fff;
    font-size: 32px;
    font-weight: 700;
    transition-delay: .15s;
  }
</style>
