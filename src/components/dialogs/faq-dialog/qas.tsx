export const qas = [
	{
		question: "Bei welche Aufgaben kann BärGPT unterstützen?",
		answer:
			"BärGPT kann eine Vielzahl von Aufgaben übernehmen. Es bietet einen einfachen und intuitiven Zugang zu den Fähigkeiten eines KI-Sprachmodells. Damit lassen sich verschiedene Routinetätigkeiten der Verwaltungsarbeit effizienter gestalten, etwa das Erstellen von Vermerken, das Formulieren von E-Mails oder das Zusammenfassen von Texten. Weitere Anwendungsfälle möchten wir gemeinsam mit den Nutzenden – also mit Ihnen – herausarbeiten. Auch dazu dient diese Testumgebung.",
	},
	{
		question: "Wie ist BärGPT entstanden?",
		answer:
			"Im Frühjahr 2024 hat die Berliner Senatskanzlei eine „KI-Taskforce” einberufen und eine Reihe von Workshops im CityLAB Berlin ausgerichtet, um die Einsatzmöglichkeiten von Künstlicher Intelligenz für die Verwaltungsarbeit zu diskutieren. Dabei wurde der Bedarf deutlich, den Beschäftigten eine niedrigschwellig nutzbare Testumgebung zur Verfügung zu stellen, um in einem geschützten Rahmen erste Ideen erproben zu können. Das CityLAB hat daraufhin angeboten, eine solche Plattform einzurichten.",
	},
	{
		question:
			"Was muss ich bei der Nutzung in Sachen Datenschutz und Datensicherheit beachten?",
		answer: (
			<div className="flex flex-col gap-y-3">
				<p>
					BärGPT bietet Nutzer:innen verschiedene Large Language Modelle zur
					Auswahl, die sich bezüglich des Datenschutzes unterscheiden.
				</p>
				<p>
					Das Modell <b>azure-gpt-4o-mini</b> wird von Microsoft in einem
					schwedischen Rechenzentrum betrieben und liegt damit im DSGVO-Raum.
					Eingegebene Daten werden weder gespeichert noch zu Trainingszwecken
					verwendet. Damit bietet das Modell ein höheres Datenschutzniveau als
					vergleichbare Angebote aus den USA.
				</p>
				<p>
					Das Modell <b>openai-gpt-4o-mini</b> bietet die gleiche
					Funktionalität, wird jedoch von OpenAI selbst betrieben. Der
					Serverstandort ist hier in den Vereinigten Staaten. Dieses Modell
					sollte lediglich zu Vergleichszwecken genutzt werden und bietet
					ansonsten keine Vorteile gegenüber dem Modell von Microsoft.
				</p>
				<p>
					Das Modell <b>citylab-macstudio-llama-3.1</b> wird datenschutzkonform
					vom CityLAB Berlin gehostet. Es handelt sich um ein Open
					Source-Modell, welches in der Qualität oft mit den kommerziellen
					Angeboten mithalten kann.
				</p>
				<p>
					Es ist zu berücksichtigen, dass keines der verfügbaren KI-Modelle im
					Berliner Landesnetz betrieben wird. Personenbezogene oder anderweitig
					sensible Daten, sowie Daten, die ausschließlich für die Nutzung im
					Berliner Landesnetz vorgesehen sind, dürfen nicht eingegeben werden.
				</p>
			</div>
		),
	},
	{
		question:
			"Wie kann ich die Qualität und Richtigkeit der generierten Antworten bewerten?",
		answer:
			"Die von einem KI-Sprachmodell generierten Antworten sind nicht zwangsläufig faktisch korrekt. Daher sollten Sie die generierten Antworten stets kritisch hinterfragen und auf ihre Plausibilität prüfen. Es wird empfohlen, die Antworten durch zusätzliche Recherche und das Heranziehen weiterer Quellen zu verifizieren.",
	},
	{
		question: "Kann BärGPT auch für andere Anwendungsfälle genutzt werden?",
		answer:
			"BärGPT ist eine flexible KI-Infrastruktur und kann prinzipiell für verschiedene Anwendungsfälle und Kontexte angepasst und weiterentwickelt werden. Sie haben eine Idee für einen speziellen Anwendungsfall, bei dem BärGPT unterstützen kann? Dann freuen wir uns über eine Nachricht.",
	},
];
