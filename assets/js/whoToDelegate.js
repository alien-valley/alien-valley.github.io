$.ajax({
    type: 'POST',
    url: 'https://my.hc1node.com:35997',
    crossDomain: true,
    data: '{"jsonrpc": "2.0","id": 30,"method": "embedded.pillar.getAll","params": [0, 150]}',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
    }, success: function (data) {
        var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
        let rewardPerProducedMomentum = 7200 / 8640;
        let totalDelegateRewards = 3456;
        let totalMomentumsInAnEpoch = 8640;

        let totalWeight = 0;
        let totalExpected = 0;
        let delegatedZnn = 1000 * 100000000;

        for (let index in data.result.list) {
            val = data.result.list[index];
            totalWeight += val.weight;
            totalExpected += val.currentStats.expectedMomentums;
        }

        for (let index in data.result.list) {
            val = data.result.list[index];

            // Insert a row at the end of table
            var newRow = tbodyRef.insertRow();
            newRow.insertCell().appendChild(document.createTextNode(val.rank + 1));
            newRow.insertCell().appendChild(document.createTextNode(val.name));
            newRow.insertCell().appendChild(document.createTextNode(val.giveDelegateRewardPercentage));
            newRow.insertCell().appendChild(document.createTextNode(val.giveMomentumRewardPercentage));

            let w = (val.weight / 100000000000).toFixed(3);
            newRow.insertCell().appendChild(document.createTextNode(w + "K"));

            let stats = val.currentStats.producedMomentums + "/" + val.currentStats.expectedMomentums;
            let percentageS = "0%";
            let percentage = 0;
            if (val.currentStats.expectedMomentums !== 0) {
                percentageS = (100 * val.currentStats.producedMomentums / val.currentStats.expectedMomentums).toFixed(0) + "%";
                percentage = val.currentStats.producedMomentums / val.currentStats.expectedMomentums;
            }
            newRow.insertCell().appendChild(document.createTextNode(stats + " " + percentageS));

            let returns = delegatedZnn / totalWeight * totalDelegateRewards * val.giveDelegateRewardPercentage / 100;
            returns += totalMomentumsInAnEpoch / totalExpected * val.currentStats.producedMomentums * val.giveMomentumRewardPercentage / 100 * rewardPerProducedMomentum * delegatedZnn / (val.weight + delegatedZnn);
            newRow.insertCell().appendChild(document.createTextNode(returns.toFixed(2)));
        }

        console.log(data);
        //process the JSON data etc
    }
})
