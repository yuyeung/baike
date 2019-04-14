/**
 * 百科全部服务列表
 * @author Jason
 */
import { AppList } from '@index/types/AppList'

export const apps: AppList = [
  {
    key: 'swzx',
    name: '事务中心',
    apps: [
      {
        key: 'affairs',
        open: true,
        name: '事务咨询',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-affairs.svg',
        url: 'http://www.szuswzx.com/sdbk/issue/index',
      },
      {
        key: 'line',
        open: true,
        name: '微信排队',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-line.svg',
        url: 'http://www.szuswzx.com/jiaohaoxitong/Student/toshow',
      },
      {
        key: 'open-time',
        open: true,
        name: '服务时间',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-open-time.svg',
        url: 'http://mp.weixin.qq.com/s/7tny_mzDlkz-na9S0nwREA',
      },
    ]
  },
  {
    key: 'xyxw',
    name: '校园新闻',
    apps: [
      {
        key: 'board',
        open: true,
        name: '公文通',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-board.svg',
        url: 'http://www.szuswzx.com/sdbk/board/board_list',
      },
      {
        key: 'school-calandar',
        open: true,
        name: '本学期校历',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-school-calandar.svg',
        url: 'http://mp.weixin.qq.com/s/wGWBzwmxiZzKz-LGLb_L9A',
      },
    ]
  },
  {
    key: 'xszq',
    name: '新生专区',
    apps: [
      {
        key: 'register',
        open: true,
        name: '入学报到',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-register.svg',
        url: 'http://mp.weixin.qq.com/s/KXFOvVf4-ACfrMt0GXAujw',
      },
      {
        key: 'roommate-finding',
        open: true,
        name: '觅室友',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-roommate-finding.svg',
        url: 'http://www.szuswzx.com/sdbk/missyou',
      },
      {
        key: 'my-class-query',
        open: true,
        name: '分班查询',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-my-class-query.svg',
        url: 'http://www.szuswzx.com/sdbk/new_student_class',
      },
    ]
  },
  {
    key: 'jwxx',
    name: '教务学习',
    apps: [
      {
        key: 'schedule',
        open: true,
        name: '课程表',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-schedule.svg',
        url: 'https://www.szucal.com/',
      },
      {
        key: 'class-query',
        open: true,
        name: '排课查询',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-class-query.svg',
        url: 'http://www.szuswzx.com/sdbk/paike',
      },
      {
        key: 'class-result',
        open: true,
        name: '选课结果',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-class-result.svg',
        url: 'http://www.szuswzx.com/sdbk/course_result',
      },
      {
        key: 'exam-classroom',
        open: true,
        name: '考场查询',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-exam-classroom.svg',
        url: 'http://www.szuswzx.com/sdbk/exam',
      },
      {
        key: 'grade',
        open: true,
        name: '期末考试成绩',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-grade.svg',
        url: 'http://www.szuswzx.com/sdbk/score/newLink',
      },
      {
        key: 'cet-4or6',
        open: true,
        name: '四六级',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-cet-4or6.svg',
        url: 'http://www.szuswzx.com/sdbk/cet/index/zxcvb',
      },
    ]
  },
  {
    key: 'shfw',
    name: '生活服务',
    apps: [
      {
        key: 'power-usage',
        open: true,
        name: '电费查询',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-power-usage.svg',
        url: 'http://www.szuswzx.com/sdbk/powerusage',
      },
      {
        key: 'card-finding',
        open: true,
        name: '校园卡找回',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-card-finding.svg',
        url: 'http://www.szuswzx.com/sdbk/card/index',
      },
    ]
  },
  {
    key: 'qtcx',
    name: '其他查询',
    apps: [
      {
        key: 'teachers-phone',
        open: true,
        name: '教师电话查询',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-teachers-phone.svg',
        url: 'http://swzx.szu.edu.cn/#/teacher',
      },
      {
        key: 'tuition',
        open: true,
        name: '学费查询',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-tuition.svg',
        url: 'http://www.szuswzx.com/sdbk/scost/index/qwerty',
      },
      {
        key: 'poor-certification',
        open: true,
        name: '家庭困难认定',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-poor-certification.svg',
        url: 'http://www.szuswzx.com/sdbk/poor_certification',
      },
    ]
  },
  {
    key: 'stsz',
    name: '系统功能',
    apps: [
      {
        key: 'bind-wechat',
        open: true,
        name: '微信绑定',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-wechat.svg',
        url: 'http://www.szuswzx.com/sdbk/passport/clear_cookie',
      },
      {
        key: 'unbind-wechat',
        open: true,
        name: '解绑微信',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-wechat.svg',
        url: 'http://www.szuswzx.com/sdbk/welcome/unbind',
      },
      {
        key: 'profile',
        open: false,
        name: '个人资料',
        icon: 'https://cdn.szuswzx.com/img/app-icon/icon-profile.svg',
        url: 'http://www.szuswzx.com/sdbk/welcome/notopen',
      },
    ]
  },
]
