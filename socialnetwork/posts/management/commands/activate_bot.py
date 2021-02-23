from django.core.management import BaseCommand

from ..bot.run import SocialNetworkBot


class Command(BaseCommand):
    help = 'Object of this bot demonstrate functionalities of the system according to defined rules from settings.'

    def handle(self, *args, **options):
        try:
            social_network_bot = SocialNetworkBot()
            social_network_bot.run_bot()
            self.stdout.write(
                self.style.SUCCESS('BOT FINISH HIS ACTIVITY! LET\'S GO CHECK IT AT http://localhost:8000/')
            )
        except Exception as e:
            print(e)
