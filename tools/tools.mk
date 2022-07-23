tools/plantuml.jar: tools/tools.cfg
	. ./tools/tools.cfg && curl -sfL http://sourceforge.net/projects/plantuml/files/plantuml.$${plantuml}.jar/download > ./tools/plantuml.jar
