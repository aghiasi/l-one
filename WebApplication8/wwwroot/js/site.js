$(async function () {
  let ckeckBoxVals = [];
  let city = [];
  let state = [];
  let page = 1;
  let limit = 10;
  let res = await (
      await fetch(`/Home/Getusers`)
    ).json();
    console.log(res);
    res.map((i, index) => {
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
                    <img id=${i.id
                } class='trash' src="../icons/tashcan.svg" alt="delete">
                    </button>
                </td>
                <td><input type="checkbox" name=${i.id}/></td>
</tr>
                `);
    })  
    $("#add").on("click", () => {
        $("#modal").show();
    })
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
    const res = await (await fetch("http://localhost:4000/users")).json();
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
      fetch(`http://localhost:4000/users/${i}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
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


    $("#search").on('keyup', async () => {
        const id = $("#search").val();
        if (id) {
            let res = await fetch(`/Home/searchuser/` + id);
            res = await res.json();
            console.log(res)
            if (res.length > 0) {
                $("tbody").empty();
                res.map((i, index) => {
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
                    <img id=${i.id
                        } class='trash' src="../icons/tashcan.svg" alt="delete">
                    </button>
                </td>
                <td><input type="checkbox" name=${i.id}/></td>
</tr>
                `);
                })  

            }
        }             
    })
  // the end of the scripts
});
