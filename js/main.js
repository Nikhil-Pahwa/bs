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
          createScheduleDialog(campaignData);
          break;
        default:
          console.log('do nothing');
          break;
      }
    });
  }

  function createCSVDialog(data) {
    let markup = data.actions['csv'];
    $('#dialog-message').html(`<span class="dummy-data">${markup}</span>`);
    openDialog();
  }

  function createReportingDialog(data) {
    let markup = data.actions['report'];
    $('#dialog-message').html(`<span class="dummy-data">${markup}</span>`);
    openDialog();
  }

  function createScheduleDialog(data) {
    let markup = data.actions['report'];
    $('#dialog-message').html(`<span class="dummy-data">${markup}</span>`);
    openDialog();
    $('#datepicker').datepicker({
      showOn: 'button',
      buttonImage: 'images/calendar.gif',
      buttonImageOnly: true,
      buttonText: 'Select date'
    });
  }

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
