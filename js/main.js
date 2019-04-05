let table = $(function() {
  let dummyCampaignDatas = [];

  function render(dummyCampaignData) {
    dummyCampaignData.forEach((element, index) => {
      var markup = `<tr data-id="${index}">
                      <td class='date'>
                        <div class="vertically-stacked">
                          <span class='date-active'>${
                            element.activeDate
                          }</span>  
                          <span class='date-difference'>
                          ${dateDifferenceFromToday(
                            element.activeDate
                          )} days ago
                          </span>
                        </div>
                      </td>
                      <td class='info'>
                        <div class="vertically-stacked">
                          <span class="info-name">${element.name}</span>
                          <span class="info-address">${element.address}</span>
                        </div>
                      </td>
                      <td class='view'>
                        <span class="view-pricing">View</span>
                      </td>
                      <td class='actions'>
                        <div class="actions-container">
                          <button class="csv">csv</button>
                          <button class="reporting">reporting</button>
                          <button class="schedule">schedule</button>
                          <input class="datepicker-hidden"/>
                        </div>
                      </td>
                    </tr>`;
      $('table#campaign tbody').append(markup);
    });
  }

  function attachEvents() {
    $('table').on('click', '.actions button', function() {
      let actionType = $(this).attr('class');
      let indexOfTableRow = Number(
        $(this)
          .closest('tr')
          .attr('data-id')
      );
      let campaignData = dummyCampaignDatas[indexOfTableRow];
      switch (actionType) {
        case 'csv':
          createCSVDialog(campaignData);
          break;
        case 'reporting':
          createReportingDialog(campaignData);
          break;
        case 'schedule':
          handleSchedule(campaignData);
          break;
        default:
          console.log('do nothing');
          break;
      }
    });

    $('table').on('click', '.schedule', function() {
      $(this)
        .closest('.actions')
        .find('input')
        .focus();
    });

    $('table').on('focus', '.datepicker-hidden', function() {
      $(this).datepicker();
    });
  }

  function createCSVDialog(data) {
    $('#dialog-message').html(
      `<span class="dummy-data">${createDialogMarkup(data)}</span>`
    );
    openDialog();
  }

  function createDialogMarkup(data) {
    let markup = `<table id="campaign">
    <tr>
      <th>DATE</th>
      <th>CAMPAIGN</th>
    </tr>
    <tr><td>${data.activeDate}</td>
    <td>${data.name}</td></tr>
    </table>`;
    return markup;
  }

  function createReportingDialog(data) {
    $('#dialog-message').html(
      `<span class="dummy-data">${createDialogMarkup(data)}</span>`
    );
    openDialog();
  }

  function handleSchedule() {}

  function fetchData() {
    $.get('../data/campaign-dummy-data.json', function(dummyCampaignData) {
      render(dummyCampaignData);
      dummyCampaignDatas = dummyCampaignData;
    });
  }

  function viewPricing(element) {
    alert('view me');
  }

  function dateDifferenceFromToday(date) {
    var oneDay = 24 * 60 * 60 * 1000;
    var firstDate = new Date();
    date = new Date(date);
    var diffDays = Math.round(
      Math.abs((firstDate.getTime() - date.getTime()) / oneDay)
    );
    return diffDays;
  }

  function openDialog() {
    $('#dialog-message').dialog({
      modal: true,
      buttons: {
        Ok: function() {
          $(this).dialog('close');
        }
      }
    });
  }

  /**
   * Only exposing two methods from outside
   */
  return {
    fetchData: fetchData(),
    attachEvents: attachEvents()
  };
});

(function() {
  table.fetchData;
  table.attachEvents;
})();
