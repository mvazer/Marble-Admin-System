import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { useSaleTotalId } from "./useSalesTotal";
import { format } from "date-fns";
import { formatCurrency, formatSquareMeters } from "../../utils/helpers";

// Create styles
// const styles = StyleSheet.create({
//   title: { fontSize: 32, textAlign: "center", fontWeight: "bold" },
//   page: {
//     flexDirection: "row",
//     justifyContent: "center",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf",
    },
    {
      src: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew-Y3tcoqK5.ttf",
      fontWeight: "bold",
    },
    {
      src: "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    fontFamily: "Montserrat",
    flexDirection: "column",
    padding: 20,
    fontSize: 12,
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subheader: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  itemList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  paymentList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 190,
    marginTop: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

function SaleInvoicePdf({ saleTotal, sales, customer, saleProducts }) {
  const invoiceData = {
    date: format(saleTotal.created_at, "yyyy.MM.dd"),
    endDate: saleTotal.endDate !== "Son tarix yoxdu" ? format(saleTotal.endDate, "yyyy.MM.dd") : 'Müddətsiz',
    items: [
      { description: "Item 1", quantity: 2, price: 50 },
      { description: "Item 2", quantity: 1, price: 30 },
      // Add more items as needed
    ],
    total: saleTotal.totalRevenue,
    paid: saleTotal.paid,
    customer: {
      name: customer.name,
      contact: customer.contact,
    },
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>E.H.A. Qrup Satış fakturası</Text>
          <View style={styles.itemList}>
          <Text style={styles.subheader}>Tarix: {invoiceData.date}</Text>
          <Text style={styles.subheader}>Son tarix: {invoiceData.endDate}</Text>

          </View>

          <Text style={[styles.subheader, { marginTop: 20 }]}>Sifarişçi:</Text>
          <Text style={styles.text}>{invoiceData.customer.name}</Text>
          <Text style={styles.text}>{invoiceData.customer.contact}</Text>

          <Text style={[styles.subheader, { marginTop: 20 }]}>Məhsullar:</Text>
          {sales.map((item, index) => (
            <View key={index} style={styles.itemList}>
              <Text style={styles.text}>
                {index + 1}. {saleProducts(item.product_id).name} (
                {item.dimensions})
              </Text>
              <Text style={styles.text}>
                {formatCurrency(item.price, "AZN")}
              </Text>
              <Text style={styles.text}>
                {formatSquareMeters(item.quantity)}
              </Text>
              <Text style={styles.text}>
                {formatCurrency(item.quantity * item.price, "AZN")}
              </Text>
            </View>
          ))}

          <View style={styles.paymentList}>
            <Text style={styles.total}>Ümumi:</Text>
            <Text style={styles.total}>
              {formatCurrency(invoiceData.total, "AZN")}
            </Text>
          </View>
          <View style={styles.paymentList}>
            <Text style={styles.total}>Ödənilən:</Text>
            <Text style={styles.total}>
              {formatCurrency(invoiceData.paid, "AZN")}
            </Text>
          </View>
          <View style={styles.paymentList}>
            <Text style={styles.total}>Qalıq:</Text>
            <Text style={styles.total}>
              {formatCurrency(invoiceData.total - invoiceData.paid, "AZN")}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default SaleInvoicePdf;
