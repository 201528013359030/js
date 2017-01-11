$("#sel-job").select({
  title: "选择职业",
  items: ["法官", "医生", "猎人", "学生", "记者", "其他"]
});

$("#sel-mobile").select({
  title: "选择手机",
  items: [
    {
      title: "iPhone 3GS",
      value: "001",
    },
    {
      title: "iPhone 5",
      value: "002",
    },
    {
      title: "iPhone 5S",
      value: "003",
    },
    {
      title: "iPhone 6",
      value: "004",
    },
    {
      title: "iPhone 6S",
      value: "005",
    },
    {
      title: "iPhone 6P",
      value: "006",
    },
    {
      title: "iPhone 6SP",
      value: "007",
    },
    {
      title: "iPhone SE",
      value: "008",
    },
    {
      title: "iPhone 7",
      value: "009"
    }
  ]
});

$("#sel-in").select({
  title: "您的爱好",
  multi: true,
  items: [
    {
      title: "画画",
      value: 1
    },
    {
      title: "打球",
      value: 2
    },
    {
      title: "唱歌",
      value: 3
    },
    {
      title: "游泳",
      value: 4
    },
  ]
});


 $("#mobile").picker({
    title: "请选择您的手机",
    cols: [
      {
        textAlign: 'center',
        values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
      }
    ],
    onChange: function(p, v, dv) {
      console.log(p, v, dv);
    },
    onClose: function(p, v, d) {
      console.log("close");
    }
});
$("#name").picker({
    title: "怎么称呼您？",
    cols: [
      {
        textAlign: 'center',
        values: ['Mr', 'Ms']
      },
      {
        textAlign: 'center',
        values: ['Amy', 'Bob', 'Cat', 'Dog', 'Ella', 'Fox', 'Google']
      }
    ]
});


