$(async function () {
  let ckeckBoxVals = [];
  let city = [];
  let state = [];
  let page = 1;
    let limit = 10; 
    let pageSize = 10;
  let res = await (
    await fetch(`/Home/Getusers/?pageIndex=1&pageSize=${pageSize}`)
    ).json();
    let index = res.pageIndex;
    let total = res.totalPages;
    let next = res.hasNextPage;
    let perv = res.hasPreviousPage; 
  console.log(res);
  const renderTable = (res) => {
    res.items.map((i, index) => {
      $("tbody").append(`
                <tr>
                    <td class = 'f-num' >${index + 1}</td>
                    <td class = 'f-num' >${i.id}</td>
                    <td>${i.name}</td>
                    <td>${i.fname}</td>
                    <td class = 'f-num' >${i.phone}</td>
                    <td>${i.state}</td>
                    <td>${i.city}</td>
                    <td>
                    <button id=${i.id} class='icon-btn'>
                    <img id=${
                      i.id
                    } class='trash' src="../icons/tashcan.svg" alt="delete">
                    </button>
                </td>
                <td><input type="checkbox" name=${i.id}/></td>
</tr>
                `);
    });
  }; //f-n
  const pagiApender = (apend) => {
    $(".pagi").append(apend);
  }; //f-n
  const pagination = (index ,total,next ,prev) => {
      if (!prev) {
          $(".pagi").empty();
      pagiApender(`
            <button disabled id="1">...</button>
            <button disabled >1</button>
`);
      if (next) {
        pagiApender(`
            <button class='pagi-btn' id=${index + 1}>${
          index + 1
        }</button>
            <button class='pagi-btn' id=${total}> ${
          total
        } </button>
`);
      } else {
        pagiApender(`
            <button disabled>...</button>
`);
      }
      } else {
          $(".pagi").empty();
      pagiApender(`
            <button  id="1" class ='pagi-btn'>اولین صفحه</button>
            <button class='pagi-btn' id=${index - 1 }>${index - 1}</button>
            <button disabled >${index}</button >
`);
      if (next) {
        pagiApender(`
            <button class='pagi-btn' id=${index + 1}>${
          index + 1
        }</button>
            <button class='pagi-btn' id=${index}> ${total
        } </button>
`);
      } else {
        pagiApender(`
            <button disabled>...</button>
`);
      }
    }
    }; //f-n
    renderTable(res);
    pagination(res.pageIndex, res.totalPages, res.hasNextPage, res.hasPreviousPage);
  $("#pageSize").on("change", async () => {
    pageSize = $("#pageSize").val();
    let res = await (
      await fetch(`/Home/getusers/?pageIndex=1&pageSize=${pageSize}`)
    ).json();
    console.log(res);
    $("tbody").empty();
    renderTable(res);
      pagination(res.pageIndex, res.totalPages, res.hasNextPage, res.hasPreviousPage);
  });
  $("#add").on("click", () => {
    $("#modal").show();
  });
  $("form").on("submit", (e) => {
    e.preventDefault();
    const name = $('[name="name"]');
    const id = $('[name = "id"]');
    const fname = $("[name = 'fname']");
    const phone = $("[name  = 'phone']");
    const state = $("[name = 'state']");
    const city = $('[name = "city"]');
    if (
      !name.val() ||
      !id.val() ||
      !fname.val() ||
      !phone.val() ||
      !state.val() ||
      !city.val()
    ) {
      !name.val()
        ? name.addClass("red-border")
        : name.removeClass("red-border");
      !id.val() ? id.addClass("red-border") : id.removeClass("red-border");
      !fname.val()
        ? fname.addClass("red-border")
        : fname.removeClass("red-border");
      !phone.val()
        ? phone.addClass("red-border")
        : phone.removeClass("red-border");
      !state.val()
        ? state.addClass("red-border")
        : state.removeClass("red-border");
      !city.val()
        ? city.addClass("red-border")
        : city.removeClass("red-border");
    } else {
      fetch("/Home/createuser", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: parseInt(id.val()),
          name: name.val(),
          fname: fname.val(),
          phone: phone.val(),
          state: state.val(),
          city: city.val(),
        }),
      });
      $("#modal").hide();
      window.location.reload();
    }
  });
  $(".icon-btn").on("click", (e) => {
    e.preventDefault();
    const id = e.target.id;
    fetch(`Home/deleteuser/${id}`);
    window.location.reload();
  });
  $("#data").on("click", async () => {
    const res = await (await fetch("/home/getalluser")).json();
    const worksheet = XLSX.utils.json_to_sheet(res);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  });
  $('input[type = "checkbox"]').on("click", (e) => {
    if (e.target.checked) {
      ckeckBoxVals.push(e.target.name);
    } else {
      ckeckBoxVals.pop(e.target.name);
    }
  });

  $("#de-all").on("click", (e) => {
    if (ckeckBoxVals.length > 0) {
      $("#delete-modal").show();
    }
  });
  $(".cancle-delete-all").on("click", () => {
    $("#delete-modal").hide();
  });
  $("#dlt-all").on("click", () => {
    for (let i of ckeckBoxVals) {
      fetch(`/home/deleteuser/${i}`);
    }
  });
  $(".table-tab-btn").on("click", () => {
    $(".table-tab").show();
    $(".sign-tab").hide();
  });
  $(".sign-tab-btn").on("click", () => {
    $(".table-tab").hide();
    $(".sign-tab").show();
  });

  $("#search").on("keyup", async () => {
    const id = $("#search").val();
    if (id) {
      let res = await fetch(`/Home/searchuser/` + id);
      res = await res.json();
      if (res.items.length > 0) {
        $("tbody").empty();
        res.items.map((i, index) => {
          $("tbody").append(`
                <tr>
                    <td class = 'f-num' >${index + 1}</td>
                    <td class = 'f-num' >${i.id}</td>
                    <td>${i.name}</td>
                    <td>${i.fname}</td>
                    <td class = 'f-num' >${i.phone}</td>
                    <td>${i.state}</td>
                    <td>${i.city}</td>
                    <td>
                    <button id=${i.id} class='icon-btn'>
                    <img id=${
                      i.id
                    } class='trash' src="../icons/tashcan.svg" alt="delete">
                    </button>
                </td>
                <td><input type="checkbox" name=${i.id}/></td>
</tr>
                `);
        });
      }
    }
  });
  $(".cancle").on("click", (e) => {
    $("#modal").hide();
  });
    $(".pagi-btn").on("click", async (e) => {
         index = parseInt(e.target.id)
         res = await (await fetch(`/Home/Getusers/?pageIndex=${index}&pageSize=${pageSize}`)).json();
        $("tbody").empty();
        renderTable(res)
        
    })
  // the end of the scripts
});
