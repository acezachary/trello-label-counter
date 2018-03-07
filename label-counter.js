// ==UserScript==
// @name         Trello Label Count
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Show Summary of Trello Label Count
// @author       You
// @match        https://trello.com/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

    window.addEventListener('load', function() {
    // your code here
        var labelColor = {
    	"new-label": "#4d4d4d",
    	"in-progress-label": "#ad9900",
    	"waiting-feedback-label": "#78149e",
    	"feedbacked-label": "#005282",
    	"blocked-label": "#9c1f0e",
    	"completed-label": "#388628"
    };

    var labelTip = {
    	"new-label": "New",
    	"in-progress-label": "In Progress",
    	"waiting-feedback-label": "Waiting Feedback",
    	"feedbacked-label": "Feedbacked",
    	"blocked-label": "Blocked",
    	"completed-label": "Completed"
    };

    var getStatisticSpan = function (labelClass, labelContent) {
    	var elemSpan = document.createElement('span');
		elemSpan.className = labelClass;
		elemSpan.innerHTML = labelContent;
		elemSpan.title = labelTip[labelClass];
		elemSpan.style.cssText = 'border-radius: 3px;color: #fff; width: 35px; display: inline-block; text-align: center; margin-right: 5px;background-color: ' + labelColor[labelClass] + ';';

		return elemSpan;
    };

    var cards = Array.from(document.getElementsByClassName('list-wrapper'));
    var cardStatistics = cards.map(card => {
        let cardsContainer = card.getElementsByClassName('list-cards')[0];
        if (cardsContainer !== undefined) {  //Skip Last List: "Add a new list..."
            let statisticsDiv = document.createElement('div');
            statisticsDiv.className = "custom-card-statistics";
            statisticsDiv.style.cssText = "text-align: center; margin-bottom: 5px;";
            statisticsDiv.appendChild(getStatisticSpan('new-label', card.getElementsByClassName('card-label-black').length));
            statisticsDiv.appendChild(getStatisticSpan('in-progress-label', card.getElementsByClassName('card-label-yellow').length));
            statisticsDiv.appendChild(getStatisticSpan('waiting-feedback-label', card.getElementsByClassName('card-label-purple').length));
            statisticsDiv.appendChild(getStatisticSpan('feedbacked-label', card.getElementsByClassName('card-label-blue').length));
            statisticsDiv.appendChild(getStatisticSpan('blocked-label', card.getElementsByClassName('card-label-red').length));
            statisticsDiv.appendChild(getStatisticSpan('completed-label', card.getElementsByClassName('card-label-green').length));

            card.getElementsByClassName('list-cards')[0].insertAdjacentElement('afterbegin', statisticsDiv);
        }
    });
    }, false);
})();
