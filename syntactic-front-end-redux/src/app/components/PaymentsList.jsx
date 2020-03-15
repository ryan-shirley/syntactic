// React
import React, { Component } from "react"

// Components
import { Badge, Button } from "react-bootstrap"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import Moment from "react-moment"

class PaymentsList extends Component {
    /**
     * openPayment() Open payment form
     */
    openPayment = payment => {
        this.props.setPaymentBeingPayed(payment)
        this.props.history.push("/billing/payment/" + payment._id)
    }

    render() {
        let { payments, canPay } = this.props

        // Table Columns
        let columns = [
            {
                name: "Invoice Date",
                selector: "createdAt",
                sortable: true,
                maxWidth: "250px",
                cell: row => (
                    <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>
                )
            },
            {
                name: `Project/${canPay ? "Writer" : "Client"}`,
                selector: "project_id.title",
                sortable: true,
                cell: row => (
                    <Link
                        to={"/projects/" + row.project_id._id}
                        className="text-reset"
                    >
                        {row.project_id.title}
                        <br />
                        <span className="body-text-light">
                            {canPay
                                ? row.receiver_id.first_name +
                                  " " +
                                  row.receiver_id.last_name
                                : row.payer_id.first_name +
                                  " " +
                                  row.payer_id.last_name}
                        </span>
                    </Link>
                )
            },
            {
                name: "Amount",
                selector: "amount",
                sortable: true,
                maxWidth: "250px",
                cell: row => (
                    <span className="body-text-light">€{row.amount}</span>
                )
            },
            {
                name: "Status",
                selector: "status",
                sortable: true,
                maxWidth: "250px",
                cell: row => (
                    <Badge
                        variant={
                            row.status === "pending" ? "warning" : "success"
                        }
                        className="badge-md text-uppercase"
                    >
                        {row.status}
                    </Badge>
                )
            }
        ]

        if (canPay) {
            columns.push({
                name: "Action",
                sortable: false,
                maxWidth: "150px",
                cell: row =>
                    row.status !== "paid" && (
                        <Button
                            onClick={() => this.openPayment(row)}
                            variant="primary"
                        >
                            Pay
                        </Button>
                    )
            })
        }

        return (
            <DataTable
                className="datatable"
                columns={columns}
                data={payments}
                defaultSortField="createdAt"
                defaultSortAsc={false}
                keyField="_id"
                pagination={true}
                noHeader={true}
                highlightOnHover={true}
            />
        )
    }
}

export default PaymentsList
