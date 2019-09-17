function SimpleJson2TableTr(data) {
  return (
    "<tr><td><strong>" + data.k + "</strong></td><td>" + data.v + "</td></tr>"
  );
}

function SimpleJson2Table(ptitle, pdata) {
  let title = ptitle || "";
  let data = pdata;
  let rows = [];

  let d = {};
  for (const [key, value] of Object.entries(data)) {
    rows.push(SimpleJson2TableTr({ k: key, v: value }));
  }
  data = d;

  var jTable = "<table>" + "<tbody>" + rows.join("") + "</tbody>" + "</table>";

  return "<div>" + title + jTable + "</div>";
}

function GetSimpleRows(objectData) {
  let rows = [];
  if (objectData) {
    // console.log(objectData);
    for (const [key, value] of Object.entries(objectData)) {
      let val = null;
      if (key) {
        // console.log(key, value);
        val = value === null ? "null" : value;
        val = value === undefined ? "undefined" : value;

        let itIsSimpleValue = false;

        if (typeof val === "string") itIsSimpleValue = true;
        if (typeof val === "number") itIsSimpleValue = true;
        if (typeof val === "boolean") {
          itIsSimpleValue = true;
          val = val.toString();
        }

        if (itIsSimpleValue) {
          // simple json row
          // console.log(key, val);
          rows.push(SimpleJson2TableTr({ k: key, v: val }));
        } else {
          if (Array.isArray(val)) {
            // array
            rows.push(
              "<tr>" +
                '  <td colSpan="2">' +
                "    <div>" +
                "      <strong>" +
                key +
                "</strong>" +
                "    </div>" +
                '    <table class="json-2-table-child">' +
                "      <tbody>" +
                GetSimpleRows(val) +
                "</tbody>" +
                "    </table>" +
                "  </td>" +
                "</tr>"
            );
          } else {
            // object
            rows.push(
              "<tr>" +
                '  <td colSpan="2">' +
                "    <div>" +
                "      <strong>" +
                key +
                "</strong>" +
                "    </div>" +
                '    <table class="json-2-table-child">' +
                "      <tbody>" +
                GetSimpleRows(val) +
                "</tbody>" +
                "    </table>" +
                "  </td>" +
                "</tr>"
            );
          }
        }
      }
    }
  }
  return rows.join("");
}

function ObjectJson2Table(data) {
  let rows = GetSimpleRows(data);
  return "<table><tbody>" + rows + "</tbody></table>";
}

function Json2Table(jsonData) {
  return '<div class="json-2-table">' + ObjectJson2Table(jsonData) + "</div>";
}
