<template>
  <div class="container-staff">
    <div class="title-content">
      <h3 class="title-text">Manage Staff</h3>
    </div>
    <div class="content-staff">
      <el-row>
        <el-col :span="24">
          <div class="type-staff-content">
            <el-row gutter="20">
              <el-col :span="6">
                <div class="btn-box">
                  <el-button type="success" icon="el-icon-plus" @click="showPopupStaff">Add staff</el-button>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="btn-box">
                  <el-button type="success" icon="el-icon-plus" @click="redirectToAddStaff">Add</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="table-box mt-30">
                  <el-table
                    :data="staff"
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
              <el-col :span="18">
                <div class="trip-car-staff" />
              </el-col>
            </el-row>
            <el-dialog
              :title="titlePopupTypeStaff"
              :visible.sync="dialogVisibleStaff"
              width="30%"
              :before-close="closePopupStaff"
            >
              <el-form label-width="100px" :model="formStaff">
                <el-form-item label="Name" :error="errors.name">
                  <el-input v-model="formStaff.name" />
                </el-form-item>
                <el-form-item label="Gender" :error="errors.gender">
                  <el-select v-model="formStaff.gender">
                    <el-option
                      v-for="item in optionsGender"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Birthday" :error="errors.birthday">
                  <el-date-picker
                    v-model="formStaff.birthday"
                    type="date"
                    format="DD/MM/yyyy"
                    value-format="DD/MM/yyyy"
                  />
                </el-form-item>
                <!--                <el-form-item label="Avatar" :error="errors.avatar">-->
                <!--                  <el-input v-model="formStaff.avatar" />-->
                <!--                </el-form-item>-->
                <el-form-item label="Phone" :error="errors.phone">
                  <el-input v-model="formStaff.phone" />
                </el-form-item>
                <el-form-item label="Address" :error="errors.address">
                  <el-input v-model="formStaff.address" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="createStaff(isEditStaff)">{{ titleButton }}</el-button>
                  <el-button @click="closePopupStaff">Cancel</el-button>
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
import { createStaff, getListStaff } from '@/api/staff'
import constants from '@/utils/constants'
import { Message } from 'element-ui'
export default {
  name: 'Index',
  mixins: [messageUtils],
  data() {
    return {
      staff: [],
      loading: false,
      formStaff: {},
      titleButton: '',
      isEditStaff: false,
      titlePopupTypeStaff: 'Create Staff',
      dialogVisibleStaff: false,
      optionsGender: [
        {
          label: 'Nam',
          value: 1
        },
        {
          label: 'Nữ',
          value: 0
        }
      ],
      imageUrl: null
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    async init() {
      await getListStaff().then(res => {
        if (res.status === constants.HTTP.OK && res.data.data) {
          this.staff = res.data.data.data
        }
      }
      ).catch(() => {
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    },
    async createStaff() {
      await createStaff(this.formStaff).then(res => {
        if (res.status === constants.HTTP.OK) {
          this.dialogVisibleStaff = false
          Message.success('Create Staff Successfully')
          this.init()
        }
      }).catch((err) => {
        if (err.data.errors) this.errors = err.data.errors
      })
    },
    closePopupStaff() {
      this.isEditStaff = false
      this.dialogVisibleStaff = false
      this.formStaff = {}
      this.errors = {}
    },
    showPopupStaff() {
      this.formStaff = {}
      this.isEditStaff = false
      this.titlePopupTypeStaff = 'Create Staff'
      this.dialogVisibleStaff = true
      this.titleButton = 'Create'
    },
    handleEditStaff() {

    },
    handleDeleteStaff() {

    },
    onSelectFile(res, file) {
      this.imageUrl = null
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    redirectToAddStaff() {
      this.$router.push({ name: 'AddStaffCarTrip' })
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
