$("#start").cityPicker({
    title: "选择出发地",
    onChange: function (picker, values, displayValues) {
      console.log(values, displayValues);
    }
});
$("#end").cityPicker({
    title: "选择目的地"
});
$("#home-city").cityPicker({
    title: "选择目的地",
    showDistrict: false,
    onChange: function (picker, values, displayValues) {
      console.log(values, displayValues);
    }
});