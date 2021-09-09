from urllib.parse import quote

from allauth.account.adapter import DefaultAccountAdapter

# TODO: get url from Site in django.contrib.sites.models

class AccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        email = quote(emailconfirmation.email_address.email)
        return f'http://localhost:3000/auth/verify-email/{email}/{emailconfirmation.key}'