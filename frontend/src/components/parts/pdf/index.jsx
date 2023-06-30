import { formatDate } from "@/lib/formatDate";
import { formatTime } from "@/lib/formatTime";
import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 5,
  },
});

const PDF = ({
  title,
  location,
  chosenDate,
  startTime,
  endTime,
  description,
}) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Text wrap={false} style={{ alignSelf: "flex-start" }}>
            {" "}
            Title: {title}
          </Text>
          <Text wrap={false} style={{ alignSelf: "flex-start" }}>
            Location: {location}
          </Text>{" "}
          <Text wrap={false} style={{ alignSelf: "flex-start" }}>
            {" "}
            Date: {formatDate(chosenDate, "dd MMMM yyyy")}
          </Text>{" "}
          <Text wrap={false} style={{ alignSelf: "flex-start" }}>
            {" "}
            Start Time: {formatTime(startTime)}
          </Text>
          <Text wrap={false} style={{ alignSelf: "flex-start" }}>
            {" "}
            End Time: {formatTime(endTime)}
          </Text>
          <Text wrap={false} style={{ alignSelf: "flex-start" }}>
            {" "}
            Description: {description}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
const PDFView = (props) => {
  return (
    <PDFViewer>
      <PDF {...props} />
    </PDFViewer>
  );
};
export default PDFView;
