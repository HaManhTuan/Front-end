<template>
  <div class="container-booking">
    <div class="movie-container">
      <div class="container">
        <el-row>
          <el-col :span="24">
            <div class="screen" />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped lang="scss">
  .screen {
    transform: rotateX(-48deg);
    box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
    width: 200px;
    height: 150px;
    margin: 20px 0;
    background: #fff;
    color: white;
    text-align: center;
    text-indent: .1em;
    //&::before {
    //  content: '';
    //  position: absolute;
    //  top: 10%;
    //  bottom: 10%;
    //  right: -5%;
    //  left: -5%;
    //  background: inherit;
    //  border-radius: 5% / 50%;
    //}
  }
</style>
