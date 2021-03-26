<nav id="left-sidebar-nav" class="sidebar-nav">
	<ul id="main-menu" class="metismenu">
		<#list nav_items as nav_item>
			<#assign
				nav_item_attr_has_popup = ""
				nav_item_css_class = ""
				nav_item_layout = nav_item.getLayout()
			/>

		<#if nav_item.isSelected()>
			<#assign
				nav_item_attr_has_popup = "aria-haspopup='true'"
				nav_item_css_class = "selected active"
			/>
		</#if>
		<#assign layout_icon = " ">		
		<#if nav_item_layout.getExpandoBridge().hasAttribute("icon")>
			<#if nav_item_layout.getExpandoBridge().getAttribute("icon")??>
				<#assign layout_icon = nav_item_layout.getExpandoBridge().getAttribute("icon")>
			</#if>
		</#if>
		<#if !nav_item.hasChildren()>
			<li class="${nav_item_css_class}" id="layout_${nav_item.getLayoutId()}" role="presentation">
				<a aria-labelledby="layout_${nav_item.getLayoutId()}" ${nav_item_attr_has_popup} href="${nav_item.getURL()}" ${nav_item.getTarget()} role="menuitem"><i class="fa ${layout_icon}"></i><span><@liferay_theme["layout-icon"] layout=nav_item_layout /> ${nav_item.getName()}</span></a>
			</li>
		</#if>
			<#if nav_item.hasChildren()>
				<li class="${nav_item_css_class}" id="layout_${nav_item.getLayoutId()}" role="presentation">
					<a aria-labelledby="layout_${nav_item.getLayoutId()}" ${nav_item_attr_has_popup} href="${nav_item.getURL()}" ${nav_item.getTarget()} role="menuitem" class="has-arrow" aria-expanded="false"><i class="fa ${layout_icon}"></i><span><@liferay_theme["layout-icon"] layout=nav_item_layout /> ${nav_item.getName()}</span></a>

					<ul class="child-menu collapse" role="menu" aria-expanded="false">
						<#list nav_item.getChildren() as nav_child>
							<#assign
								nav_child_css_class = ""
							/>

							<#if nav_item.isSelected()>
								<#assign
									nav_child_css_class = "selected active"
								/>
							</#if>
							<#assign
								nav_child_layout = nav_child.getLayout()
							/>
							<#assign layout_icon_child = " ">
							<#if nav_child_layout.getExpandoBridge().hasAttribute("icon")??>
								<#if nav_child_layout.getExpandoBridge().getAttribute("icon")??>
									<#assign layout_icon_child = nav_child_layout.getExpandoBridge().getAttribute("icon")>
								</#if>
							</#if>
							<li class="${nav_child_css_class}" id="layout_${nav_child.getLayoutId()}" role="presentation">
								<a aria-labelledby="layout_${nav_child.getLayoutId()}" href="${nav_child.getURL()}" ${nav_child.getTarget()} role="menuitem"><i class="fa ${layout_icon_child}"></i><span><@liferay_theme["layout-icon"] layout=nav_item_layout /> ${nav_child.getName()}</span></a>
							</li>
						</#list>
					</ul>
				</li>
			</#if>			
		</#list>
	</ul>
</nav>