from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from CapyStarAPI.services.Translate import Translates


class TransalteViews(APIView):

    def get(selt, request):
        text = request.query_params.get("text")
        if not text:
            return Response(
                {"error" : "Lỗi rỗng"},
                status = status.HTTP_400_BAD_REQUEST
            )
        else:
            trans = Translates();
            result = trans.ToTranslate(text);
            return Response(
                { # "origin": result.origin,       # văn bản gốc
                # "src": result.src,             # ngôn ngữ gốc
                # "dest": result.dest,           # ngôn ngữ dịch
                "translated": result.text      # văn bản dịch
                },
                status = status.HTTP_200_OK
                
            )
