const delay = 1000;

setTimeout(() => {
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('action') === "ticketdetail") {
		// Add classes to various elements to help targeting later
		ticketDetail_addSupportClasses();
		
		// Display ticket information in side bar
		sidebarTicketInformation(urlParams);
		
		// Pre-fill ticket detail form fields
		setTicketDetailPresets(urlParams);
		
		// Initialize ticket detail timer
		startTicketDetailTimer();
	} else if (urlParams.get('action') === "timeform") {
		// Pre-fill time form fields
		setTimeformPresets();
	} else {
		// Highlights internal reviewe tickets for better visibility
		highlightInternalReviews();
	}
	
	function ticketDetail_addSupportClasses() {
		// hosting information cms url
		document.querySelector("#hosting_info > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(5)").classList.add('cms-url');
		
		// hosting information web url
		document.querySelector("#hosting_info > table > tbody > tr > td > table > tbody > tr:nth-child(6) > td:nth-child(5)").classList.add('web-url');
		
		// ticket title
		document.querySelector("body > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table:nth-child(6) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td.datafield").classList.add('ticket-title');
		
		// ticket type
		document.querySelector("body > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table:nth-child(6) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td:nth-child(2)").classList.add('ticket-type');
		
		// CMS Database
		document.querySelector("#hosting_info > table > tbody > tr > td > table > tbody > tr:nth-child(6) > td:nth-child(2)").classList.add('cms-database');
	}
	
	function sidebarTicketInformation(urlParams) {
		const data = [
		    { label : "Ticket:", value : `${urlParams.get('ticketID')} - ${document.querySelector('.ticket-title').innerHTML}` },
		    { label : "Type:", value : document.querySelector('.ticket-type').innerHTML },
		    { label : "CMS URL:", value : document.querySelector('.cms-url').innerHTML },
		    { label : "Web URL:", value : document.querySelector('.web-url').innerHTML },
		    { label : "CMS Database:", value : document.querySelector('.cms-database').innerHTML },
		]
		
		// generate html template from data array
		let rowHtml = '';
		data.forEach((val) => {
			rowHtml += `<div class="sidebar-row">
				<span class="bigbold">${val.label}</span>
				<span>${val.value}</span>
			</div>`
		});
		
		// create sidebar row
		var container = document.createElement('tr');
		container.innerHTML = `<div class="sidebar-ticket-info">${rowHtml}</div>`;
		
		// Append to side bar
		document.querySelector("body > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody").lastChild.after(container);
		
	}
	
	function setTicketDetailPresets(urlParams) {
		// Set document title to ticket number and title
		let ticketNumber = urlParams.get('ticketID');
		let ticketTitle = document.querySelector("body > table:nth-child(3) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table:nth-child(6) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td.datafield").textContent || undefined;
		
		if(ticketNumber !== undefined) { document.title = `${ticketNumber} - ${ticketTitle}`; }
	
		// set "Internal Review"
		document.querySelector("select[name='newstatusID']").value = "4";
		
		// Assign to CMS Support
		document.querySelector("select[name='newuserID']").value = "846";
	
		// check "Attach Time Entry"
		document.querySelector("input[name='addtime']").click();
		
		// "Can Client View Comment" to "No"
		document.getElementById('internal0').click();
	}
	
	function setTimeformPresets() {
		if (document.querySelector('#acct_company').value === '') {
			new Promise(resolve => {
				popAcctID('2224', 'Simpleview - CMS Dept.');
				setTimeout(() => { resolve() }, 500);
			}).then(() => {
				document.querySelector("#oppprojID").value = 'prj_14613';
			});	
		}
	}
	
	function highlightInternalReviews() {
		console.log('highlight internal reviews');
		document.querySelectorAll('#tickets td').forEach(item => { 
		    if (item.textContent.trim() === "Internal Review") {
		        item.closest('tr').style.backgroundColor = "rgba(98, 196, 98, 0.3)";
		    } 
		});
	}
	
	function startTicketDetailTimer() {
		// increment time fields every 15 minutes
		let timerHours = 0;
		let timerMins = 15;
		document.querySelector("select[name='time_mins']").value = timerMins.toString();
	
		var setTimer = setInterval(function() {
			timerMins += 15;
			if(timerMins == 60) { timerMins = 0; timerHours += 1; }
	
			document.querySelector("select[name='time_mins']").value = timerMins.toString();
			document.querySelector("select[name='time_hrs']").value = timerHours.toString();
			console.log(`Time: ${timerHours}:${timerMins}`);
		}, 15*60*1000);
			
		document.addEventListener('input', function (event) {
			if (event.target.id == "time_mins" || event.target.id == "time_hrs") {
				clearInterval(setTimer);
			}
		}, false);
	}
	
	
}, 1500);

