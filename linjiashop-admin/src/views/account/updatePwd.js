import {updatePwd} from '@/api/user'

export default {
  data() {
    return {
      form: {
        oldPassword: '',
        password: '',
        rePassword: ''
      },
      activeName: 'updatePwd',
      user: {}
    }
  },

  computed: {
    rules() {
      return {
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 5, max: 100, message: '密码长度不能小于5', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.user = this.$store.state.user.profile
    },
    handleClick(tab, event) {
      this.$router.push({path: '/account/' + tab.name})
    },
    updatePwd() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updatePwd({
            oldPassword: this.form.oldPassword,
            password: this.form.password,
            rePassword: this.form.rePassword
          }).then(response => {
            this.$message({
              message: '密码修改成功',
              type: 'success'
            })
            this.$store.dispatch('user/logout')
            this.$router.push('/dashboard')

          }).catch((err) => {
            this.$message({
              message: err,
              type: 'error'
            })
          })
        }
      })
    }

  }
}