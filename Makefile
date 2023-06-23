package:
	npm run package

install: package
	code --install-extension hopper-0.4.0.vsix

uninstall:
	 code --uninstall-extension bjorn-eric-abr.hopper

publish-minor:
	npx --yes vsce publish minor

publish-patch:
	npx --yes vsce publish patch
