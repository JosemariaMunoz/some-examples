
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.BasicHttpContext;

public class AddUsers {

	public static void main(String[] args) throws ClientProtocolException, IOException {
		
		String csvFile = "/Users/josemariamunoz/Documents/projects/customs/add-users-csv/users_test.csv";
		BufferedReader br = null;
		String line = "";
		String companyId = "20099";

		ArrayList<HashMap<String, String>> mylist = new ArrayList<HashMap<String, String>>();
		HttpHost targetHost = new HttpHost("localhost", 8009, "http");
		DefaultHttpClient httpclient = new DefaultHttpClient();
		BasicHttpContext ctx = new BasicHttpContext();
		HttpPost post = new HttpPost("/api/jsonws/user/add-user");
		Base64 b = new Base64();
		String encoding = b.encodeAsString(new String("test@liferay.com:test").getBytes());
		post.setHeader("Authorization", "Basic " + encoding);
		Calendar yesterday = Calendar.getInstance();
		yesterday.add(Calendar.DAY_OF_YEAR, -1);
		Calendar nextWeek = Calendar.getInstance();
		nextWeek.add(Calendar.WEEK_OF_YEAR, 1);

		try {

			br = new BufferedReader(new FileReader(csvFile));

			while ((line = br.readLine()) != null) {

				String[] columns = line.split(",");

				List<NameValuePair> params = new ArrayList<NameValuePair>();

				params.add(new BasicNameValuePair("companyId", companyId));
				params.add(new BasicNameValuePair("autoPassword", "false"));
				params.add(new BasicNameValuePair("password1", columns[2]));
				params.add(new BasicNameValuePair("password2", columns[2]));
				params.add(new BasicNameValuePair("autoScreenName", "false"));
				params.add(new BasicNameValuePair("screenName", columns[0]));
				params.add(new BasicNameValuePair("emailAddress", columns[1]));
				params.add(new BasicNameValuePair("facebookId", "0"));
				params.add(new BasicNameValuePair("openId", ""));
				params.add(new BasicNameValuePair("locale", columns[3]));
				params.add(new BasicNameValuePair("firstName", columns[4]));
				params.add(new BasicNameValuePair("middleName", columns[5]));
				params.add(new BasicNameValuePair("lastName", columns[6]));
				params.add(new BasicNameValuePair("prefixId", "0"));
				params.add(new BasicNameValuePair("suffixId", "0"));
				params.add(new BasicNameValuePair("male", "true"));
				params.add(new BasicNameValuePair("birthdayMonth", "8"));
				params.add(new BasicNameValuePair("birthdayDay", "3"));
				params.add(new BasicNameValuePair("birthdayYear", "1964"));
				params.add(new BasicNameValuePair("jobTitle", ""));
				params.add(new BasicNameValuePair("groupIds", ""));
				params.add(new BasicNameValuePair("organizationIds", ""));
				params.add(new BasicNameValuePair("roleIds", ""));
				params.add(new BasicNameValuePair("userGroupIds", ""));
				params.add(new BasicNameValuePair("sendEmail", "false"));
				params.add(new BasicNameValuePair("agreedToTermOfUse", "true"));

				UrlEncodedFormEntity entity = new UrlEncodedFormEntity(params, "UTF-8");
				post.setEntity(entity);
				HttpResponse resp = httpclient.execute(targetHost, post, ctx);
				System.out.println(resp.getStatusLine());
				resp.getEntity().writeTo(System.out);

			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			httpclient.getConnectionManager().shutdown();
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

}
