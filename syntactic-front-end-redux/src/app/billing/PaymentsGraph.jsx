// React
import React, { Component } from "react"

// Components
import { ResponsiveBar } from "@nivo/bar"
import { Card } from "react-bootstrap"

class PaymentsGraph extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.formatPayments(props.payments)
        }
    }

    /**
     * formatPayments() Format payments for graph
     */
    formatPayments = data => {
        var monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ]

        // Use reduce to aggregate your data. Pass around a hash so that we have
        // direct access to groups as well as ensure groups appear just once.
        var dataByMonth = data.reduce(function(dataByMonth, datum) {
            var date = new Date(datum.createdAt)
            var value = datum.amount
            var month = monthNames[date.getMonth()]
            var year = ("" + date.getFullYear()).slice(-2)
            var group = month + " " + year

            dataByMonth[group] = (dataByMonth[group] || 0) + value

            return dataByMonth
        }, {})

        // Now just turn the hash into an array.
        var finalResult = Object.keys(dataByMonth).map(function(group) {
            return { month: group, value: dataByMonth[group] }
        })

        return finalResult
    }

    render() {
        let data = this.state.data

        return (
            <Card body className="chart billing">
                <ResponsiveBar
                    data={data}
                    keys={["value"]}
                    indexBy="month"
                    margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                    padding={0.3}
                    colors="#498afb"
                    tooltip={d => {
                        return (
                            <>
                                {d.data.month} -{" "}
                                <strong>€{d.data.value}</strong>
                            </>
                        )
                    }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Month",
                        legendPosition: "middle",
                        legendOffset: 30
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Amount (€)",
                        legendPosition: "middle",
                        legendOffset: -40
                    }}
                    enableGridX={true}
                    enableLabel={false}
                    legends={[
                        {
                            dataFrom: "keys",
                            anchor: "top-right",
                            direction: "row",
                            justify: false,
                            translateX: 40,
                            translateY: -50,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: "left-to-right",
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </Card>
        )
    }
}

export default PaymentsGraph
