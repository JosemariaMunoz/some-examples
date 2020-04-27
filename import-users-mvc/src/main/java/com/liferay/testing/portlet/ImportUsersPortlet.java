package com.liferay.testing.portlet;


import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.servlet.SessionErrors;
import com.liferay.portal.kernel.servlet.SessionMessages;
import com.liferay.portal.kernel.upload.UploadPortletRequest;
import com.liferay.portal.kernel.util.Portal;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Calendar;
import java.util.Locale;
import java.util.Scanner;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.Portlet;
import javax.portlet.PortletException;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=category.sample",
		"com.liferay.portlet.instanceable=true",
		"javax.portlet.display-name=Import Users",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user"
	},
	service = Portlet.class
)
public class ImportUsersPortlet extends MVCPortlet {

	public void processForm(
			ActionRequest actionRequest, ActionResponse actionResponse)
			throws IOException, PortletException {

		UploadPortletRequest uploadPortletRequest =
				_portal.getUploadPortletRequest(actionRequest);

		File file = uploadPortletRequest.getFile("csvFile");

		BufferedReader br = null;
		String line = "";
		try {

			Scanner scanner = new Scanner(file);
			while (scanner.hasNextLine()) {
				line = scanner.nextLine();
				System.out.println(line);
				String[] columns = line.split(",");
				_log.info("Columns --> " + columns[0] + columns[1]);

				long creatorUserId = 0;
				long companyId = 20099;
				boolean autoPassword = true;
				String password1 = columns[2];
				String password2 = columns[2];
				boolean autoScreenName = true;
				String screenName = columns[0];
				String emailAddress = columns[1];
				long facebookId = 0;
				String openId = "";
				Locale locale = Locale.forLanguageTag(columns[3]);
				String firstName = columns[4];
				String middleName = columns[5];
				String lastName = columns[6];
				long prefixId = 0;
				long suffixId = 0;
				boolean male = false;
				int birthdayMonth = Calendar.JANUARY;
				int birthdayDay = 1;
				int birthdayYear = 1970;
				String jobTitle = "";
				long[] groupIds = null;
				long[] organizationIds = null;
				long[] roleIds = null;
				long[] userGroupIds = null;
				boolean sendEmail = true;

				ServiceContext serviceContext = new ServiceContext();

				try {
					_userLocalService.addUser(
						creatorUserId, companyId, autoPassword, password1, password2,
						autoScreenName, screenName, emailAddress, facebookId, openId,
						locale, firstName, middleName, lastName, prefixId, suffixId, male,
						birthdayMonth, birthdayDay, birthdayYear, jobTitle, groupIds,
						organizationIds, roleIds, userGroupIds, sendEmail, serviceContext);
				} catch (PortalException e) {
					e.printStackTrace();
				}
			}
			scanner.close();
			SessionMessages.add(actionRequest, "fileProcessed");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			System.out.println(e);
			SessionErrors.add(actionRequest, e.getClass().getName());
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
					System.out.println(e);
				}
			}
		}
	}

	private static Log _log = LogFactoryUtil.getLog(
			ImportUsersPortlet.class);

	@Reference(unbind = "-")
	protected void setUserLocalService(UserLocalService userLocalService) {
		_userLocalService = userLocalService;
	}
	private UserLocalService _userLocalService;

	@Reference
	private Portal _portal;
}