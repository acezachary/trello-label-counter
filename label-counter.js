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

	var labels = {
		"card-label-black": {
			inUsed: true,
			labelClass: "black-lable-count",
			color: "#4d4d4d",
			tooltip: "New"
		}, 
		"card-label-yellow": {
			inUsed: true, 
			labelClass: "yellow-lable-count",
			color: "#ad9900",
			tooltip: "In Progress"
		},
		"card-label-purple": {
			inUsed: true,
			labelClass: "purple-lable-count",
			color: "#78149e",
			tooltip: "Waiting Feedback"
		},
		"card-label-blue": {
			inUsed: true,
			labelClass: "blue-lable-count",
			color: "#005282",
			tooltip: "Feedbacked"
		},
		"card-label-red":  {
			inUsed: true,
			labelClass: "red-lable-count",
			color: "#9c1f0e",
			tooltip: "Blocked"
		},
		"card-label-green":  {
			inUsed: true,
			labelClass: "green-lable-count",
			color: "#388628",
			tooltip: "Completed"
		}
	};

	var getStatisticSpan = function (labelClass, labelCount) {
		
	
		var elemSpan = document.createElement('span');
		elemSpan.className = labels[labelClass].labelClass;
		elemSpan.innerHTML = labelCount;
		elemSpan.title = labels[labelClass].tooltip;
		elemSpan.style.cssText = 'border-radius: 3px;color: #fff; width: 35px; display: inline-block; text-align: center; margin-right: 5px;background-color: ' + labels[labelClass].color + ';';
		return elemSpan;
    };
	
    window.addEventListener('load', function() {
    var cards = Array.from(document.getElementsByClassName('list-wrapper'));
    var cardStatistics = cards.map(card => {
        let cardsContainer = card.getElementsByClassName('list-cards')[0];
        if (cardsContainer !== undefined) {  //Skip Last List: "Add a new list..."
            let statisticsDiv = document.createElement('div');
            statisticsDiv.className = "custom-card-statistics";
            statisticsDiv.style.cssText = "text-align: center; margin-bottom: 5px;";
			for (let label in labels) {
				if (labels[label].inUsed) {
					statisticsDiv.appendChild(getStatisticSpan(label, card.getElementsByClassName(label).length));
				}
			}
            card.getElementsByClassName('list-cards')[0].insertAdjacentElement('afterbegin', statisticsDiv);
        }
    });
    }, false);
})();
