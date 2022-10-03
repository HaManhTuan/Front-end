<template>
  <div class="container-staff">
    <div class="title-content">
      <h3 class="title-text">Manage Trip</h3>
    </div>
    <div class="content-staff">
      <el-row>
        <el-col :span="24">
          <div class="type-staff-content">
            <el-row>
              <el-col :span="24">
                <div class="btn-box">
                  <el-button type="success" icon="el-icon-plus" @click="showPopupStaff">Add Trip</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="table-box mt-30">
                  <el-table
                    :data="trips"
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
                      label="Name"
                    >
                      <template slot-scope="{row}">
                        <span> {{ row.name }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="from"
                      label="From"
                    />
                    <el-table-column
                      prop="to"
                      label="To"
                    />
                    <el-table-column
                      prop="count"
                      label="Count"
                    />
                    <el-table-column
                      align="left"
                      label="Action"
                      width="150"
                    >
                      <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEditStaff(scope.$index, scope.row)" />
                        <el-button type="danger" icon="el-icon-delete" @click="handleDeleteStaff(scope.$index, scope.row)" />
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
            <el-dialog
              :title="titlePopupTrip"
              :visible.sync="dialogVisibleTrip"
              width="30%"
              :before-close="closePopupTrip"
            >
              <el-form label-width="100px" :model="formTrip">
                <el-form-item label="Name" :error="errors.name">
                  <el-input v-model="formTrip.name" />
                </el-form-item>
                <el-form-item label="From" :error="errors.from">
                  <el-select v-model="formTrip.from">
                    <el-option
                      v-for="item in optionsFrom"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="From" :error="errors.to">
                  <el-select v-model="formTrip.to">
                    <el-option
                      v-for="item in optionsTo"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Count" :error="errors.count">
                  <el-input-number
                    v-model="formTrip.count"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="createTrip(isEditTrip)">{{ titleButton }}</el-button>
                  <el-button @click="closePopupTrip">Cancel</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import messageUtils from '@/mixins/messageUtils'
import { createTrip, getListTrip } from '@/api/trip'
import constants from '@/utils/constants'
import { Message } from 'element-ui'
export default {
  name: 'Index',
  mixins: [messageUtils],
  data() {
    return {
      loading: false,
      formTrip: {},
      titleButton: '',
      isEditTrip: false,
      titlePopupTrip: 'Create Trip',
      dialogVisibleTrip: false,
      optionsFrom: constants.FROM_CITY,
      optionsTo: constants.TO_CITY,
      imageUrl: null,
      trips: []
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    async init() {
      this.formTrip = {}
      this.isEditTrip = false
      this.loading = true
      await getListTrip().then(res => {
        if (res.status === constants.HTTP.OK && res.data.data) {
          this.trips = res.data.data.data
        }
      }
      ).catch(() => {
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    },
    async createTrip() {
      await createTrip(this.formTrip).then(res => {
        if (res.status === constants.HTTP.OK) {
          this.dialogVisibleTrip = false
          Message.success('Create Trip Successfully')
          this.init()
        }
      }).catch((err) => {
        if (err.data.errors) this.errors = err.data.errors
      })
    },
    closePopupTrip() {
      this.isEditTrip = false
      this.dialogVisibleTrip = false
      this.formTrip = {}
      this.errors = {}
    },
    showPopupStaff() {
      this.formTrip = {
        name: null,
        from: 'Ninh Bình',
        to: 'Hà Nội',
        count: 1
      }
      this.isEditTrip = false
      this.titlePopupTrip = 'Create Trip'
      this.dialogVisibleTrip = true
      this.titleButton = 'Create'
    },
    handleEditStaff() {

    },
    handleDeleteStaff() {

    },
    onSelectFile(res, file) {
      this.imageUrl = null
      this.imageUrl = URL.createObjectURL(file.raw)
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
.avatar-uploader::v-deep .el-upload {
  border: 1px dashed hsla(0,0%,100%,0.0784313725490196);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader::v-deep .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
