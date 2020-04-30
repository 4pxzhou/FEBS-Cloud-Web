export default {
  route: {
    dashboard: 'Dashboard',
    profile: 'Profile'
  },
  navbar: {
    setting: 'Settings',
    github: 'Repository',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    docs: 'Document',
    size: 'Global Size',
    deleteCache: 'DeleteCache'
  },
  login: {
    title: 'DCZHW System Login',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    code: 'Code',
    ortherLoginType: 'Orther login type',
    chooseToSignIn: 'Sign in with the following account: ',
    type: {
      up: 'Account Password',
      social: 'Third Party Account'
    }
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  table: {
    accusation: {
      mid: 'Member ID',
      hmid: 'Member ID of the informant',
      umid: 'Member ID of the whistleblower',
      hcontact: 'Contact information of the informant',
      ucontact: 'Contact information of informer',
      img1: 'Report pictures1',
      img2: 'Report pictures2',
      img3: 'Report pictures3',
      img4: 'Report pictures4',
      img5: 'Report pictures5',
      status: 'Reporting state'
    },
    order: {
      paytype: 'Payment method',
      orderid: 'External order number',
      mid: 'Member ID',
      price: 'Price',
      otype: 'Order type',
      status: 'Order status',
      paytime: 'Transaction time'
    },
    member: {
      cellphone: 'Cellphone',
      headimg: 'Head sculpture',
      nickname: 'Nickname',
      name: 'Full name',
      sex: 'Gender',
      idcard: 'ID number',
      frontcardphoto: 'Front photo of ID card',
      height: 'Body weight (KG)',
      weight: 'Height (CM)',
      nativeplace: 'Native place',
      workcity: 'Work city',
      status: 'Membership status',
      isverify: 'Audit status',
      isdivorce: 'Marital status',
      haschildern: 'Do you have children',
      hasroom: 'Do you have a room',
      hascar: 'Do you have a car',
      marryad: 'Marriage advertisement',
      password: 'Membership password'
    },
    price: {
      name: 'Cost name',
      price: 'Number of fees',
      ptype: 'Expense type'
    },
    question: {
      question: 'Question',
      answera: 'A',
      answerb: 'B',
      answerc: 'C',
      answerd: 'D',
      rightanswer: 'Right Key'
    },
    user: {
      username: 'UserName',
      password: 'Password',
      sex: 'Gender',
      email: 'Email',
      dept: 'Department',
      role: 'Role',
      mobile: 'Mobile',
      status: 'Status',
      createTime: 'CreateTime',
      modifyTime: 'ModifyTime',
      lastLoginTime: 'LastLoginTime',
      desc: 'Personal Description',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Again',
      social: 'Third Party Account'
    },
    role: {
      roleName: 'RoleName',
      remark: 'Description',
      createTime: 'CreateTime',
      perms: 'Permissions'
    },
    menu: {
      parentId: 'Parent',
      menuName: 'Name',
      type: 'Type',
      icon: 'Icon',
      component: 'Component',
      path: 'URL',
      orderNum: 'Order',
      perms: 'Permissions'
    },
    dept: {
      deptName: 'DeptName',
      parentId: 'Parent',
      orderNum: 'Order'
    },
    systemLog: {
      username: 'UserName',
      operation: 'Description',
      createTime: 'CreateTime',
      time: 'Duration',
      method: 'Method',
      params: 'parameter',
      ip: 'IP',
      location: 'Location'
    },
    loginLog: {
      username: 'UserName',
      loginTime: 'LoginTime',
      ip: 'IP',
      location: 'Location',
      system: 'System',
      browser: 'Browser'
    },
    gen: {
      config: {
        author: 'Author',
        basePackage: 'Base Package',
        entityPackage: 'Entity Package',
        mapperPackage: 'Mapper Package',
        mapperXmlPackage: 'Mapper Xml Package',
        servicePackage: 'Service Package',
        serviceImplPackage: 'ServiceImpl Package',
        controllerPackage: 'Controller Package',
        isTrim: 'Trim Prefix',
        trimValue: 'Trim Value'
      },
      generate: {
        tableName: 'TableName',
        remark: 'Remark',
        dataRows: 'DataRows',
        createTime: 'CreateTime',
        updateTime: 'UpdateTime'
      }
    },
    eximport: {
      field1: 'Field 1',
      field2: 'Field 2',
      field3: 'Field 3',
      createTime: 'Import Time'
    },
    check: 'Examine and Verify',
    refresh: 'Refresh',
    operation: 'Operation',
    search: 'Search',
    reset: 'Reset',
    more: 'More',
    add: 'Add',
    export: 'Export',
    import: 'Import',
    templateDownload: 'Template Download',
    delete: 'Delete',
    resetPassword: 'RestPassword',
    openInNewPage: 'New Page'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  system: {
    title: 'DCZHW System'
  },
  tips: {
    usernameShouldNotBeEmpty: 'Username can not be empty',
    passwordShouldNotBeEmpty: 'Password can not be empty',
    switchLanguageSuccess: 'Switch language successfully',
    loginSuccess: 'Login successful',
    loginFail: 'Login failed',
    defaultPassword: 'The user\'s default password is 1234qwer',
    getDataFail: 'Failed to get data',
    checkSuccess: 'Audit pass',
    forbidSuccess: 'Disable success',
    enableSuccess: 'Enable success',
    checkFail: 'Audit failed',
    createSuccess: 'Create successfully',
    updateSuccess: 'Update successfully',
    deleteSuccess: 'Delete successfully',
    noDataSelected: 'No data selected yet',
    confirmDelete: 'The selected data will be permanently deleted, continue?',
    confirmDeleteCache: 'Whether to clear the user permission cache immediately?',
    containCurrentUser: 'The operation has been canceled because it contains the currently logged in user',
    neverLogin: 'Never logged in to the DCZHW system',
    nothing: 'Nothing',
    topId: 'A value of 0 indicates a top-level node',
    choose: 'Select: ',
    chooseNothing: 'No icons have been selected yet',
    onlyChooseOne: 'Only one node can be selected as the parent node',
    noNodeSelected: 'Please select a node first',
    confirmDeleteNode: 'The selected node and its child nodes will be permanently deleted. Continue?',
    iframeGrant: 'Userame: DCZHW Password: 123456',
    notEqual: 'Inconsistent values entered twice',
    oldPasswordIncorrect: 'Old password incorrect',
    uploadSuccess: 'Upload Successfully',
    uploadFailed: 'Upload failed',
    onlySupportXlsx: 'Only supports Xlsx type files',
    updating: 'Updating',
    updateFailed: 'Update failed',
    noPermission: 'No permission',
    confirmRestPassword: 'Make sure to reset the selected user password?',
    resetPasswordSuccess: 'The selected user password reset has been reset to 1234qwer',
    getCodeImageFailed: 'Failed to get image verification code',
    tooManyRequest: 'Getting the authentication code is too frequent. Please try again in 1 minute',
    clientOriginSecret: 'The original password of the client is: '
  },
  rules: {
    require: 'Can\'t be empty',
    range1to1: '1 characters in length',
    range2to10: '2 to 10 characters in length',
    range3to10: '3 to 10 characters in length',
    range3to20: '3 to 20 characters in length',
    range4to10: '4 to 10 characters in length',
    range6to20: '6 to 20 characters in length',
    range10to20: '10 to 20 characters in length',
    range1to50: '1 to 50 characters in length',
    range5to255: '5 to 255 characters in length',
    email: 'Email is invalid',
    mobile: 'Phone number is invalid',
    usernameExist: 'The username already exists',
    clientIdExist: 'The clientId already exists',
    roleNameExist: 'The role name already exists',
    noMoreThan10: 'Can\'t exceed 10 characters in length',
    noMoreThan11: 'Can\'t exceed 11 characters in length',
    noMoreThan20: 'Can\'t exceed 20 characters in length',
    noMoreThan50: 'Can\'t exceed 50 characters in length',
    noMoreThan100: 'Can\'t exceed 100 characters in length',
    invalidInteger: 'Please enter an integer greater than zero',
    invalidURL: 'URL is invalid',
    pricenameExist: 'The feesname already exists',
    pricenumber: 'Must be Number, MaxValue is 99999',
    questionExist: 'The question already exists'
  },
  common: {
    system: 'Microservice Auth System',
    desc: {
      a: 'Based on Spring Boot 2.2.0 & Spring Cloud Hoxton.RELEASE',
      b: 'Use Spring Cloud OAuth2 Unified Authentication',
      c: 'Authentication server resource server separation, easy to expand',
      d: 'Front-end separation architecture for increased efficiency',
      e: 'Integrate multiple monitoring to escort microservices',
      f: 'Provide detailed documentation and teach you how to build it'
    },
    view: 'Detail',
    tips: 'Tips',
    clear: 'Clear',
    confirm: 'Confirm',
    processing: 'Processing',
    done: 'Done',
    cancel: 'Cancel',
    adopt: 'Adopt',
    notpass: 'Not pass',
    add: 'Create',
    edit: 'Modify',
    check: 'Check',
    forbid: 'Forbid',
    username: 'User Name',
    dept: 'Department',
    createTime: 'Create Time',
    yes: 'Yes',
    no: 'No',
    isverify: {
      tobeaudited: 'To be audited',
      pass: 'Adopt',
      notpass: 'Not pass'
    },
    accusation: {
      begin: 'Open',
      end: 'End'
    },
    otype: {
      getinfo: 'Access to personal information Fee',
      credit: 'Credit Fee'
    },
    paytype: {
      wechat: 'WeChat payment',
      zfb: 'Alipay payment'
    },
    ptype: {
      one: 'Get contact information',
      two: 'Credit',
      three: 'Unknown'
    },
    memberStatus: {
      yes: 'Not disabled',
      no: 'Disabled'
    },
    divorce: {
      yes: 'Divorce',
      no: 'No Divorce'
    },
    hasChildern: {
      yes: 'Having Children',
      no: 'NO'
    },
    hasRoom: {
      yes: 'Having Room',
      no: 'NO'
    },
    hasCar: {
      yes: 'Having Car',
      no: 'NO'
    },
    sex: {
      male: 'Male',
      female: 'Female',
      secret: 'Secret'
    },
    ostatus: {
      unpaid: 'Unpaid',
      paid: 'Paid',
      refunded: 'Refunded',
      cancelled: 'Cancelled'
    },
    status: {
      valid: 'Valid',
      invalid: 'Invalid'
    },
    menu: {
      menu: 'Menu',
      button: 'Button'
    },
    tab: {
      common: 'Common',
      directivity: 'Directivity',
      solid: 'Solid',
      food: 'Food'
    },
    aboutMe: 'About Me',
    changeAvatar: 'Change',
    lastLoginTime: 'Last login time',
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    randomMessage: {
      a: 'Have a coffee break☕',
      b: 'Do you want to play LOL with your friends?',
      c: 'How many bugs🐞 did you write today?',
      d: 'Have you chatted in the group today?',
      e: 'What delicious food did you eat today?',
      f: 'Have you smiled today?😊',
      g: 'Have you solved the problem for others today?',
      h: 'What are you going to eat?',
      i: 'Do you want to watch movies on weekends?'
    },
    allProject: 'All Projects',
    noDept: 'No department',
    noRole: 'No role',
    firstLogin: 'First login',
    todayIp: 'Today IP',
    todayVisit: 'Today visits',
    TotalVisit: 'Total visits',
    you: 'You',
    total: 'Total',
    visitTitle: 'Nearly ten days of system access records',
    timeline: 'Timeline',
    account: 'Account',
    password: 'Password',
    importResult: 'Import Result',
    hthz: 'Hou Tian Hanzi',
    al: 'Ali Style',
    lm: 'Lian Meng',
    ctc: 'Click to select',
    pleaseInputUrl: 'Please enter a URL',
    bind: 'Bind',
    unbind: 'Unbind',
    confirmUnbind: 'Make sure to unbind the third-party account?',
    unbindSuccess: 'Unbind successfully',
    bindSuccess: 'Bind successfully',
    bindLogin: 'Bind & Login',
    signLogin: 'Sign & Login',
    current: 'Current ',
    socialAccount: ' account ',
    socialTips: ' haven\'t bound any system accounts yet, you can bind system accounts or register a new account and bind.'
  }
}
