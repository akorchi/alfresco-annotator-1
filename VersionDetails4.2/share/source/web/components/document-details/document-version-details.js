   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom,
      Event = YAHOO.util.Event,
      Selector = YAHOO.util.Selector;

   /**
    * Alfresco Slingshot aliases
    */
   var $html = Alfresco.util.encodeHTML,
      $userProfileLink = Alfresco.util.userProfileLink,
      $userAvatar = Alfresco.Share.userAvatar;
   
   
   /**
    * Alfresco Slingshot aliases
    */
   var $siteURL = Alfresco.util.siteURL;
   
   
Alfresco.DocumentVersions.prototype.onVersionDetailsClick = function DocumentVersions_onVersionsDetailsClick(nodeRef) {
	
	YAHOO.lang.later(0, this, function() {
		nodeRef = nodeRef.replace("versionStore", "workspace");
		window.location.href = $siteURL("document-version-details?nodeRef=" + nodeRef);
	});
};


/**
 * 
 */
Alfresco.DocumentVersions.prototype.getDocumentVersionMarkup = function DocumentVersions_getDocumentVersionMarkup(doc) 
{
	var downloadURL = Alfresco.constants.PROXY_URI + '/api/node/content/' + doc.nodeRef.replace(":/", "") + '/' + doc.name + '?a=true', 
	html = '';

	 html += '<div class="version-panel-left">'
	 html += '   <span class="document-version">' + $html(doc.label) + '</span>';
	 html += '</div>';
	 html += '<div class="version-panel-right">';
	 html += '   <h3 class="thin dark" style="width:' + (Dom.getViewportWidth() * 0.25) + 'px;">' + $html(doc.name) +  '</h3>';
	 html += '   <span class="actions" id="versionDetailsID">';
	 if (this.options.allowNewVersionUpload)
	 {
	    html += '   <a href="#" name=".onRevertVersionClick" rel="' + doc.label + '" class="' + this.id + ' revert" title="' + this.msg("label.revert") + '">&nbsp;</a>';
	 }
	 html += '      <a href="' + downloadURL + '" class="download" title="' + this.msg("label.download") + '">&nbsp;</a>';
	 html += '		<a href="#" name=".onViewHistoricPropertiesClick" rel="' + doc.nodeRef + '" class="' + this.id + ' historicProperties" title="' + this.msg("label.historicProperties") + '">&nbsp;</a>';
	 html += '<a href="#" name=".onVersionDetailsClick" rel="' + doc.nodeRef + '" class="' + this.id + ' versionDetails" title="Afficher le document">&nbsp;</a>';
	 html += '   </span>';
	 html += '   <div class="clear"></div>';
	 html += '   <div class="version-details">';
	 html += '      <div class="version-details-left">'
	 html += $userAvatar(doc.creator.userName, 32);
	 html += '      </div>';
	 html += '      <div class="version-details-right">';
	 html += $userProfileLink(doc.creator.userName, doc.creator.firstName + ' ' + doc.creator.lastName, 'class="theme-color-1"') + ' ';
	 html += Alfresco.util.relativeTime(Alfresco.util.fromISO8601(doc.createdDateISO)) + '<br />';
	 html += ((doc.description || "").length > 0) ? $html(doc.description, true) : '<span class="faded">(' + this.msg("label.noComment") + ')</span>';
	 html += '      </div>';
	 html += '   </div>';
	 html += '</div>';
	
	 html += '<div class="clear"></div>';
	 return html;
};

